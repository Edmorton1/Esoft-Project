import { serverPaths } from "@app/shared/PATHS";
import FormData from "form-data";
import fs from 'fs';
import $test from "packages/frontend/tests/helpers/$test";
import path from "path";

export const FILE_PATH = path.resolve(__dirname, 'files', 'guitar.jpg')

export async function registartion(body: any) {
  const {avatar, ...data} = body
	const fd = new FormData();

	fd.append("json", JSON.stringify(data));

  if (avatar) fd.append("avatar", fs.createReadStream(FILE_PATH));

	const response = await $test.post(serverPaths.registration, fd, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})

  return response
}
