import BaseController from "@app/server/config/base/Base.controller";
import TYPES from "@app/server/config/containers/types";
import HttpContext from "@app/server/config/express/Http.context";
import ConfigService from "@app/server/config/services/config.service";
import { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";
import GoogleService from "@app/server/infrastructure/requests/Google/service/Google.service";
import { paths, serverPaths } from "@app/shared/PATHS";
import { google } from "googleapis";
import { inject, injectable } from "inversify";
import { PREFIX } from "@app/shared/CONST";
import url from "url";
import { OAuth2Client } from "google-auth-library";
import { GoogleDataSchema, redirectPropsType } from "@app/types/gen/Schemas";
import { GOOGLE_TEMP_COOKIE } from "@app/shared/HEADERS";
import CryptoService from "@app/server/infrastructure/requests/shared/services/Crypto.service";
import crypto from "crypto"

interface IGoogleController {
	getAuthUrl: (ctx: HttpContext) => Promise<void>;
	getToken: (ctx: HttpContext) => Promise<void>;
	validateGoogleCookie: (ctx: HttpContext) => Promise<void>;
}

@injectable()
class GoogleController extends BaseController implements IGoogleController {
	// GoogleController.oauth2Client: OAuth2Client
	private readonly oauth2Client: OAuth2Client;
	constructor(
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
		@inject(GoogleService)
		private readonly googleService: GoogleService,
		@inject(ConfigService)
		private readonly configService: ConfigService,
		// КУКИ ЕНКРИП
		@inject(CryptoService)
		private readonly cookieEncrypt: CryptoService
	) {
		super();

		this.oauth2Client = new google.auth.OAuth2(
			this.configService.get("GOOGLE_CLIENT_ID"),
			this.configService.get("GOOGLE_CLIENT_SECRET"),
			this.configService.get("URL_SERVER") + PREFIX + serverPaths.googleGetToken,
		);

		this.bindRoutes([
			{
				path: serverPaths.validateGoogleCookie,
				method: "get",
				handle: this.validateGoogleCookie,
			},
			{
				path: serverPaths.googleGetToken,
				method: "get",
				handle: this.getToken,
			},
			{
				path: serverPaths.googleGetAuthUrl,
				method: "get",
				handle: this.getAuthUrl,
			},
			// ПОТОМ УБРАТЬ
			{
				path: "/encrypt",
				method: "get",
				handle: this.test
			}
		]);
	}

	// ПОТОМ УБРАТЬ
	test = async (ctx: HttpContext) => {
		const encrypt = this.cookieEncrypt.encrypt("super secret")
		const decrypt = this.cookieEncrypt.decrypt(encrypt)
		const random_32_bit = crypto.randomBytes(32).toString("hex")
		this.logger.info({random_32_bit})
		ctx.json({encrypt, decrypt, random_32_bit})
	}

	private getGoogleId = async (id_token: string) => {
		const ticket = await this.oauth2Client.verifyIdToken({
			idToken: id_token,
			audience: this.configService.get("GOOGLE_CLIENT_ID"),
		});
		const google_id = ticket.getPayload()?.sub;
		this.logger.info({ ГУГЛ_АЙДИ: google_id });
		if (!google_id) {
			throw new Error("Нет GoogleID");
		}
		return google_id;
	};

	private getInfo = async (google_id: string): Promise<redirectPropsType> => {
		const oauth2 = google.oauth2({ version: "v2", auth: this.oauth2Client });
		const { data } = await oauth2.userinfo.get();
		this.logger.info({ data_user_google: data });
		if (!data.email) throw new Error("НЕТУ GMAIL");
		const parsed = GoogleDataSchema.parse({
			...data,
			name: data.given_name,
			sex: data.gender,
			google_id,
		});
		// this.logger.info({email, name, gender, picture})
		return parsed;
	};

	validateGoogleCookie: IGoogleController["validateGoogleCookie"] = async ctx => {
		const googleCookie = ctx.service.req.cookies[GOOGLE_TEMP_COOKIE];
		this.logger.info({ NOT_GOOGLE_COOKIE: googleCookie });
		if (!googleCookie) {
			ctx.json({ googleCookie: null });
			return;
		}
		this.logger.info({ GOOGLE_COOKIE: googleCookie });
		try {
			const decrypt_cookie = this.cookieEncrypt.decrypt(googleCookie)
			const {google_id, ...data} = GoogleDataSchema.parse(decrypt_cookie)
			ctx.json({googleCookie: data});
		} catch {
			ctx.json({ googleCookie: null });
		}
	};

	getAuthUrl: IGoogleController["getAuthUrl"] = async ctx => {
		const scope = ["email", "openid", "profile"];
		const state = crypto.randomBytes(32).toString();
		ctx.session.state = state;

		const authorizationUrl = this.oauth2Client.generateAuthUrl({
			access_type: "offline",
			scope,
			state,
			include_granted_scopes: true,
			prompt: "consent",
			response_type: "code",
		});

		ctx.json({ url: authorizationUrl });
	};

	getToken: IGoogleController["getToken"] = async ctx => {
		const q = url.parse(ctx.url, true).query;
		if (q.error) {
			this.logger.error(q.error);
		} else if (q.state !== ctx.session.state) {
			this.logger.error("State mismatch. Possible CSRF attack");
			ctx.end("State mismatch. Possible CSRF attack");
		} else {
			const code = Array.isArray(q.code) ? q.code[0] : q.code;
			if (!code) throw new Error("Missing authorization code");

			const { tokens } = await this.oauth2Client.getToken(code);
			this.oauth2Client.setCredentials(tokens);

			if (!tokens.id_token) throw new Error("Нет token id");
			const google_id = await this.getGoogleId(tokens.id_token);

			const userInfo = await this.getInfo(google_id);
			const userid = await this.googleService.is_authorize(userInfo.email, google_id);

			if (userid) {
				ctx.session.userid = userid;
				ctx.session.role = "user";
				ctx.session.state = undefined;
				ctx.session.is_google_user = true

				ctx.redirect(this.configService.get("URL_CLIENT") + paths.profile + `/${userid}`);
			} else {
				ctx.session.state = undefined;
				
				const encrypt_userInfo = this.cookieEncrypt.encrypt(userInfo)
				
				ctx.service.res.cookie(GOOGLE_TEMP_COOKIE, encrypt_userInfo, {
					// FIXME: КОГДА БУДЕТ HTTPS ИСПРАВИТЬ
					secure: false,
					httpOnly: true,
					sameSite: "lax",
					maxAge: 5 * 60 * 1000,
				});
				ctx.redirect(this.configService.get("URL_CLIENT") + paths.registration);
			}

			// ПОКА ЧТО ЗАПРАШИВАЮ ТОЛЬКО ПОЧТУ ПОЭТОМУ scopes ЕСЛИ ЧТО ПРОВРИТЬ ЗДЕСЬ
			this.logger.info({ ТОКЕНЫ: tokens });
		}
	};
}

export default GoogleController;
