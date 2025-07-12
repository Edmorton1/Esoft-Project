import { useFormContext } from "react-hook-form";
import StoreRegistration from "@app/client/pages/Registration/widgets/stores/Store-Registration";
import { observer } from "mobx-react-lite";
import * as style from "@app/client/shared/css/pages/Registration.module.scss";
import Title from "@app/client/shared/ui/mui_components/Ttile";
import Anketa from "@app/client/pages/Registration/widgets/RegistrationWidget/modules/Anketa/Anketa";
import RegTitle from "@app/client/pages/Registration/widgets/RegistrationWidget/modules/Registration/RegTitle";

interface propsInterface {
	onSubmit: (...args: any[]) => any;
}

function RegistrationBody({ onSubmit }: propsInterface) {
	const {
		formState: { errors },
	} = useFormContext();
	const disableGoogle = typeof StoreRegistration.cookie?.email === "string";

	return (
		<form onSubmit={onSubmit} className={style.form}>
			<button onClick={() => console.log(errors)}>errors</button>
			{!disableGoogle && (
				<section>
					<Title>Регистрация</Title>
					<RegTitle />
				</section>
			)}

			<section>
				<Title>Анкета</Title>
				<Anketa />
			</section>
		</form>
	);
}

export default observer(RegistrationBody);
