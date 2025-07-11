import BaseController from "@app/server/config/base/Base.controller";
import TYPES from "@app/server/config/containers/types";
import HttpContext from "@app/server/config/express/Http.context";
import ConfigService from "@app/server/config/services/config.service";
import { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";
// import GoogleService from "@app/server/infrastructure/requests/Google/service/Google.service";
// import GoogleValidation from "@app/server/infrastructure/requests/Google/validation/Google.validation";
import { serverPaths } from "@app/shared/PATHS";
import { google } from "googleapis";
// import { URL_CLIENT } from "@app/shared/URLS";
import { inject, injectable } from "inversify";
import crypto from "crypto";
import { URL_SERVER } from "@app/shared/URLS";
import { PREFIX } from "@app/shared/CONST";
import url from "url"
import { OAuth2Client } from "google-auth-library";

interface IGoogleController {
	getAuthUrl: (ctx: HttpContext) => Promise<void>;
	getToken: (ctx: HttpContext) => Promise<void>;
  // getInfo: (ctx: HttpContext) => Promise<void>;
}

@injectable()
class GoogleController extends BaseController implements IGoogleController {
  // GoogleController.oauth2Client: OAuth2Client
  private readonly oauth2Client: OAuth2Client;
	constructor(
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
		// @inject(GoogleService)
		// private readonly googleService: GoogleService,
		@inject(ConfigService)
		private readonly configService: ConfigService,
	) {
		super();

    this.oauth2Client = new google.auth.OAuth2(
			this.configService.get("GOOGLE_CLIENT_ID"),
			this.configService.get("GOOGLE_CLIENT_SECRET"),
			URL_SERVER + PREFIX + serverPaths.googleGetToken,
		);

		this.bindRoutes([
			{
				path: serverPaths.googleGetToken,
				method: "get",
				handle: this.getToken,
			},
      {
        path: serverPaths.googleGetAuthUrl,
        method: "get",
        handle: this.getAuthUrl
      }
		]);
	}
  
  private getInfo = async () => {
    const oauth2 = google.oauth2({version: "v2", auth: this.oauth2Client})
    const {data} = await oauth2.userinfo.get()
    const {email, name, gender, picture} = data
    this.logger.info({email, name, gender, picture})
  }

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
      response_type: "code"      
    })

    ctx.json({url: authorizationUrl})
	};

	getToken: IGoogleController["getToken"] = async ctx => {
		// const params = GoogleValidation.getToken(ctx);
		// const total = this.googleService.getToken(params);

    const q = url.parse(ctx.url, true).query
    if (q.error) {
      this.logger.error(q.error)
    } else if (q.state !== ctx.session.state) {
      console.log('State mismatch. Possible CSRF attack');
      ctx.end('State mismatch. Possible CSRF attack')
    } else {
      const code = Array.isArray(q.code) ? q.code[0] : q.code
      if (!code) throw new Error("Missing authorization code")
      
      const { tokens } = await this.oauth2Client.getToken(code)
      this.oauth2Client.setCredentials(tokens)
      
      this.getInfo()

      // ПОКА ЧТО ЗАПРАШИВАЮ ТОЛЬКО ПОЧТУ ПОЭТОМУ scopes ЕСЛИ ЧТО ПРОВРИТЬ ЗДЕСЬ
      this.logger.info({ТОКЕНЫ: tokens})
    }

		ctx.json(ctx.body);
		// ctx.redirect(URL_CLIENT)
	};
}

export default GoogleController;
