import {serverPaths} from "@shared/PATHS";
import $test from "@test/helpers/$test";
import { FILE_PATH, registartion } from "@test/helpers/functions";
import fs from "fs"

describe("Регистрация - интеграционный тест", () => {
	test("Регистрация - все поля заполнены", async () => {
		const body = {
			email: "kyiv@gmail.com",
			password: "123123",
			confirmPassword: "123123",
			name: "Алексей",
			avatar: fs.createReadStream(FILE_PATH),
			sex: true,
			age: 34,
			target: "relation",
			tags: [{tag: "ШаНсСОн"}],
			city: "киев",
			location: {
				lng: 37.6173,
				lat: 55.755826,
			},
		};

		console.log(serverPaths.registration)

		const response = await registartion(body)

		console.log(response.form.tags![0].tag)

		await $test.delete(`${serverPaths.forms}/${response.form.id}`)
		await $test.delete(`${serverPaths.users}/${response.user.id}`)

		const {id, tags, avatar, ...form} = response.form
		
		console.log(avatar, 'tags')

		expect(typeof id).toStrictEqual("number")
		expect(typeof avatar).toStrictEqual("string")
		expect(typeof tags![0].id).toStrictEqual("number")
		expect(typeof tags![0].tag).toStrictEqual("string")

		expect(form).toStrictEqual({
			name: 'Алексей',
			sex: true,
      age: 34,
      target: 'relation',
      city: 'Киев',
      location: { lng: 37.6173, lat: 55.755826 },
		});

		console.log("Registration test aproovde", response);
	});
});
