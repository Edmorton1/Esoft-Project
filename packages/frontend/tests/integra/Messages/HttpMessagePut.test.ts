import $test from "packages/frontend/tests/helpers/$test";
import {FRID, paths, PLACEHOLDER_ID, TOID, YANDEX_INCLUDE} from "packages/frontend/tests/helpers/CONST";
import FormData from "form-data";
import fs from "fs"
import { Message } from "@app/types/gen/Users";
import { serverPaths } from "@app/shared/PATHS";

const TEXT = String(Math.round(Math.random() * 1000))

async function getMessage(): Promise<Message['files']> {
  const request = (await $test.get(`${serverPaths.messages}/${PLACEHOLDER_ID}`)).data[0]
  return request.files
}

async function putMessage(enablePaths: boolean, deleted: boolean = false): Promise<Message> {
  const fd = new FormData()
  fd.append('json', JSON.stringify(deleted ? {...data, deleted: await getMessage()} : data))
  console.log(deleted ? {...data, deleted: await getMessage()} : data)

  if (enablePaths) paths.forEach(path => {
    fd.append('files', fs.createReadStream(path))
  })

	const asd = (
		await $test.put(`${serverPaths.editMessage}/${PLACEHOLDER_ID}`, fd)
	).data;

	return asd;
}

const data = {
	id: PLACEHOLDER_ID,
	fromid: FRID,
	toid: TOID,
	text: TEXT,
	deleted: [],
	// files: {old: [], new: null},
};

describe("[MESSAGE]: Изменение сообщения", () => {
	test("Полное изменение без файла", async () => {
		const request = await putMessage(false);
		console.log(request);

		const {id, created_at, ...result} = request;

		expect(typeof id).toStrictEqual("number");
		expect(typeof created_at).toStrictEqual("string");

		expect(result).toStrictEqual({
			fromid: 6,
			toid: 7,
			text: TEXT,
      files: []
		});
	});

  test('Полное изменение с файлом', async () => {
    const request = await putMessage(true);
		console.log(request);

		const {id, created_at, files, ...result} = request;

		expect(typeof id).toStrictEqual("number");
		expect(typeof created_at).toStrictEqual("string");
    expect(files![0].includes(YANDEX_INCLUDE)).toStrictEqual(true)
    expect(files![1].includes(YANDEX_INCLUDE)).toStrictEqual(true)

		expect(result).toStrictEqual({
			fromid: 6,
			toid: 7,
			text: TEXT,
		});
  })

  test('Удаление файлов', async () => {
    const request = await putMessage(false, true);
		console.log(request);

		const {id, created_at, ...result} = request;

		expect(typeof id).toStrictEqual("number");
		expect(typeof created_at).toStrictEqual("string");

		expect(result).toStrictEqual({
			fromid: 6,
			toid: 7,
			text: TEXT,
      files: []
		});
  })
});
