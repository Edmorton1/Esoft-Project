import {serverPaths} from "@shared/PATHS";
import $test from "@test/helpers/$test";
import { registartion } from "@test/helpers/functions";

describe("Регистрация - интеграционный тест", () => {
  test("Регистрация - минимум заполненных полей", async () => {
    const body = {
      email: "kyiv@gmail.com",
      password: "123123",
      confirmPassword: "123123",
      name: "Алексей",
      sex: true,
      age: 34,
      target: "relation",
      tags: [],
      city: undefined,
      location: undefined,
    };

    console.log(serverPaths.registration)

    const response = await registartion(body)

    await $test.delete(`${serverPaths.forms}/${response.form.id}`)
    await $test.delete(`${serverPaths.users}/${response.user.id}`)

    const {id, last_active, ...form} = response.form

    expect(typeof id).toStrictEqual("number")
    expect(typeof last_active).toStrictEqual("string")

    expect(form).toStrictEqual({
      name: 'Алексей',
      sex: true,
      age: 34,
      target: 'relation',
      // avatar: undefined,
      // city: undefined,
      // location: undefined,
      // tags: undefined,
    });

    console.log("Registration test aproovde", response);
  });
});
