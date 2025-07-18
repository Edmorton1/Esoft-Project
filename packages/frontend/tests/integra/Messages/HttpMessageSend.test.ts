
import $test from "packages/frontend/tests/helpers/$test";
import FormData from "form-data";
import fs from "fs"
import { FRID, paths, TOID, YANDEX_INCLUDE } from "packages/frontend/tests/helpers/CONST";
import { serverPaths } from "@app/shared/PATHS";
import { Message } from "@app/types/gen/Users";


async function sendNoFiles(enablePaths: boolean): Promise<Message> {
	const fd = new FormData();

	fd.append("json", JSON.stringify(data));

	if (enablePaths) paths.forEach(path => {
		fd.append('files', fs.createReadStream(path))
	})

	const request = (await $test.post(serverPaths.sendMessage, fd, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
	).data;

	return request;
}

const data = {
	fromid: FRID,
	toid: TOID,
	text: "asd",
};

describe("[MESSAGES]: Тест сообщений", () => {
	test("Отправка сообщения без файлов", async () => {
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

	test("Отправка с файлами", async () => {
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
