import {one, toCl} from "@shared/MAPPERS";
import {serverPaths} from "@shared/PATHS";
import {Form} from "@t/gen/Users";
import $test from "@test/helpers/$test";
import {registartion} from "@test/helpers/functions";

const body = {
  email: "kyiv@gmail.com",
  password: "123123",
  confirmPassword: "123123",
  name: "Алексей",
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

const request = async (fields?: string): Promise<Form> => {
	const formuser = await registartion(body);

  console.log(formuser, 'formuser', `${serverPaths.forms}/${formuser.form.id}${fields ? `?fields=${fields}` : ""}`)

	const req = one(toCl<Form[]>(await ($test.get(`${serverPaths.forms}/${formuser.form.id}${fields ? `?fields=${fields}` : ""}`))));

	return req;
};

describe("[FORM]: Получение формы пользователя во всех вариациях", () => {
	test("Получение с *", async () => {
		const {id, tags, last_active, ...form} = await request();

    await $test.delete(`${serverPaths.users}/${id}`)
    
		expect(typeof id).toStrictEqual("number")
		expect(typeof tags![0].id).toStrictEqual("number")
		expect(typeof tags![0].tag).toStrictEqual("string")
    expect(typeof last_active).toStrictEqual("string")

		expect(form).toStrictEqual({
			name: 'Алексей',
			sex: true,
      age: 34,
      target: 'relation',
      city: 'Киев',
      location: { lng: 37.6173, lat: 55.755826 },
		});

	});

  test("Получение с id, tags, location", async () => {
    const {id, tags, ...form} = await request('id, location, tags')

    await $test.delete(`${serverPaths.users}/${id}`)
    
    expect(typeof id).toStrictEqual("number")
		expect(typeof tags![0].id).toStrictEqual("number")
		expect(typeof tags![0].tag).toStrictEqual("string")

		expect(form).toStrictEqual({
      location: { lng: 37.6173, lat: 55.755826 },
		});
  });
});
