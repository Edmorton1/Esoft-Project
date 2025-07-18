import { serverPaths } from "@app/shared/PATHS";
import { Likes } from "@app/types/gen/Users";
import $test from "packages/frontend/tests/helpers/$test";
import { FRID, TOID } from "packages/frontend/tests/helpers/CONST";


const body = {
	userid: FRID,
	liked_userid: TOID,
};

async function sendLike(body: any, fields: string = ''): Promise<Likes> {
	const request = (await $test.post(`${serverPaths.likesSend}${fields}`, body)).data;
	return request;
}

describe("[LIKES]: Тест лайков", () => {
	test("Создание лайка", async () => {
		const {id, ...result} = await sendLike(body);

    console.log(id, result);
    await $test.delete(`${serverPaths.likesDelete}/${id}`)

		expect(typeof id).toStrictEqual("number");
		expect(result).toStrictEqual({
			userid: FRID,
			liked_userid: TOID,
		});
	});

  test('Создание лайка с полями', async () => {
    const {id, ...result} = await sendLike(body, '?fields=id, liked_userid');

    console.log(id, result)
    await $test.delete(`${serverPaths.likesDelete}/${id}`)
    
    expect(typeof id).toStrictEqual("number")
    expect(result).toStrictEqual({
      liked_userid: TOID
    })
  })
});
