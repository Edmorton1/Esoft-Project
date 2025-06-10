import { StoreUserRegistration } from "@/pages/Registration/widgets/RegistrationWidget/types/RegistrationZOD";
import { toCl } from "@shared/MAPPERS";
import { serverPaths } from "@shared/PATHS";
import $test from "@test/helpers/$test";
import FormData from "form-data";
import fs from 'fs';
import path from "path";

export const FILE_PATH = path.resolve(__dirname, 'files', 'guitar.jpg')

export async function registartion(body: any) {
  const {avatar, ...data} = body
	const fd = new FormData();

	fd.append("json", JSON.stringify(data));

  avatar && fd.append("avatar", fs.createReadStream(FILE_PATH));

	const response = toCl<StoreUserRegistration>(
		await $test.post(serverPaths.registration, fd, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}),
	);

  return response
}
