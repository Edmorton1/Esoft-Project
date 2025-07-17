import * as style from "@app/client/shared/css/pages/Main/modules/information/Information.module.scss";
import InfoCard from "@app/client/pages/Main/modules/information/components/InfoCard";
import cards from "@app/client/pages/Main/modules/information/components/Info";

console.log(style);

const Information = () => {
	return (
		<section className={style.main}>
			{cards.map(card => (
        <InfoCard key={card.title} card={card} />
			))}
		</section>
	);
}

export default Information;

// <Title>Почему именно Znakomstva?</Title>
// <Typography>Здесь вы можете найти человека:</Typography>
// <Typography>- По интересам</Typography>
// <Typography>- По дистанции</Typography>
// <Typography>А также:</Typography>
// <Typography>- Писать сообщения</Typography>
// <Typography>- Делать аудио и видео звонки</Typography>
// <Typography>- Обмениваться фото, аудио видео файлами</Typography>
// <Typography>На сайте также присутсвует</Typography>
// <Typography>
// 	- Удобная система фильтрации и сортировки пользователей
// </Typography>
// <Typography>- Поиск по имени</Typography>
// <Typography>- Карта всех пользователей</Typography>
// <Typography>- Система лайков и пар</Typography>
// <Typography>
// 	Мы даём пользователю возможность самому искать, а не отдаём всё на волю
// 	алгоритмов
// </Typography>
