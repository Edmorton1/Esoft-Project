import {toCl, toJSON} from "@shared/MAPPERS";
import {serverPaths} from "@shared/PATHS";
import {Message} from "@t/gen/Users";
import $test from "@test/helpers/$test";
import {FRID, paths, TOID, YANDEX_INCLUDE} from "@test/helpers/CONST";
import FormData from "form-data";
import path from "path";
import fs from "fs"

async function sendNoFiles(enablePaths: boolean): Promise<Message> {
	const fd = new FormData();

	fd.append("json", toJSON(data));

	enablePaths && 	paths.forEach(path => {
		fd.append('files', fs.createReadStream(path))
	})

	const request = toCl<Message>(
		await $test.post(serverPaths.sendMessage, fd, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}),
	);

	return request;
}

const data = {
	fromid: FRID,
	toid: TOID,
	text: "asd",
};

describe("[MESSAGES]: Тест сообщений", () => {
	test.skip("Отправка сообщения без файлов", async () => {
		const request = await sendNoFiles(false);
		console.log(request);

		await $test.delete(`${serverPaths.deleteMessage}/${request.id}`);

		const {id, created_at, files, ...result} = request;

		expect(typeof id).toStrictEqual("number");
		expect(typeof created_at).toStrictEqual("string");
		expect(result).toStrictEqual({
			fromid: 6,
			toid: 7,
			text: "asd",
		});
	});

	test.skip("Отправка с файлами", async () => {
		const request = await sendNoFiles(true)
		const {id, created_at, files, ...result} = request

		console.log(request)

		await $test.delete(`${serverPaths.deleteMessage}/${request.id}`)

		expect(typeof id).toStrictEqual("number");
		expect(typeof created_at).toStrictEqual("string");

		expect(files![0].includes(YANDEX_INCLUDE)).toStrictEqual(true)
		expect(files![1].includes(YANDEX_INCLUDE)).toStrictEqual(true)

		expect(result).toStrictEqual({
			fromid: 6,
			toid: 7,
			text: "asd",
		});
	}, 60000)
});
