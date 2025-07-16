import StoreUsers from "@app/client/pages/Users/widgets/store/Store-Users";
import UsersCardModule from "@app/client/pages/Users/widgets/Card/modules/UsersCardModule";
import useGetById from "@app/client/shared/hooks/useGetBy";
import useUpdateParams from "@app/client/shared/hooks/useChangeParams";
import { observer } from "mobx-react-lite";
import * as style from "@app/client/shared/css/pages/Users.module.scss";
import z from "zod";

function UsersCardWidget() {
	const [params] = useUpdateParams();

	const rawPage = z.coerce.number().safeParse(params.page);
	const page = rawPage.success ? (rawPage.data > 0 ? rawPage.data : 1) : 1;
	const tags = params.tags || "";
	const target = params.target || "";
	const city = params.city || "";
	const sex = params.sex || "";
	const min_age = params.min_age || "";
	const max_age = params.max_age || "";
	const avatar = params.avatar || "";
	const name = params.name || "";
	const order = params.order || "";

	const max_distance = params.max_distance || "";

	console.log(params);

	useGetById(
		`/extendedSearch?name=${name}&tags=${tags}&page=${page}&target=${target}&city=${city}&sex=${sex === "man" ? "true" : sex === "woman" ? "false" : ""}&min_age=${min_age}&max_age=${max_age}&avatar=${avatar}&max_distance=${max_distance}&order=${order}`,
		{ callback: data => StoreUsers.initial(data) },
	);

	// console.log(
	// 	`/extendedSearch?name=${name}&tags=${tags}&page=${page}&target=${target}&city=${city}&sex=${sex === "man" ? "true" : sex === "woman" ? "false" : ""}&min_age=${min_age}&max_age=${max_age}&avatar=${avatar}&max_distance=${max_distance}&order=${order}`,
	// );
	console.log("USERCARD WIDGET RERENDER");

	return (
		<section className={style.section__users}>
			{StoreUsers.users?.map(anUser => (
				<UsersCardModule key={anUser.id} form={anUser} />
			))}
		</section>
	);
}

export default observer(UsersCardWidget);
