// import {JWTDTO, PayloadDTO, TokenReturnDTO} from "@t/gen/dtoObjects";
// import {one} from "@shared/MAPPERS";
// import ORM from "@s/infrastructure/db/requests/ORM";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { UserRoleType } from "@t/gen/Users";
// import { Response } from "express";
// import { SALT } from "@shared/CONST";

// class TokenHelper {
// 	generateTokens(payload: PayloadDTO) {
// 		const accessToken = jwt.sign(payload, process.env.ACCESS_PRIVATE_KEY, {expiresIn: "10d"});
// 		const refreshToken = jwt.sign(payload, process.env.REFRESH_PRIVATE_KEY, {expiresIn: "10d"});

// 		return [accessToken, refreshToken];
// 	}

// 	async validateAccess(accessToken: string): Promise<JWTDTO | false> {
// 		try {
// 			const token = jwt.verify(accessToken, process.env.ACCESS_PRIVATE_KEY) as JWTDTO;
// 			if (one(await ORM.getById(token.id, "users"))) {
// 				return token;
// 			} else return false;
// 		} catch {
// 			return false;
// 		}
// 	}

// 	async validateRefresh(refreshToken: string): Promise<JWTDTO | false> {
// 		try {
// 			const token = jwt.verify(refreshToken, process.env.REFRESH_PRIVATE_KEY) as JWTDTO;
// 			const hashInDB = one(await ORM.getById(token.id, "tokens")).token;

// 			const hasDB = await bcrypt.compare(refreshToken, hashInDB);

// 			if (hasDB) {
// 				return token;
// 			} else return false;
// 		} catch {
// 			return false;
// 		}
// 	}

// 	createTokens = async (id: number, role: UserRoleType, res: Response) => {
// 		// logger.info(id, role)
// 		// logger.info("CREATE TOKENS")
// 		const tokens = this.generateTokens({id: id, role: role});
// 		const [accessToken, refreshToken] = tokens;
// 		// await this.ORM.delete(id, 'tokens')
// 		const refreshHash = await bcrypt.hash(refreshToken, SALT);
// 		const tokensInDB = await ORM.getById(id, "tokens");
// 		if (tokensInDB) {
// 			await ORM.put({token: refreshHash}, id, "tokens");
// 		} else {
// 			await ORM.post({id: id, token: refreshHash}, "tokens");
// 		}
// 		res.cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: "lax", maxAge: 1000 * 60 * 60 * 24});
// 		return accessToken;
// 	};

// 	returnDTO = (dto: TokenReturnDTO, res: Response) => {
// 		res.json({
// 			user: dto.user,
// 			accessToken: dto.accessToken,
// 		});
// 	};
// }

// export default new TokenHelper();
