import UsersCardInfo from "@/shared/ui/components/UsersCardInfo"
import StoreForm from "@/shared/stores/Store-Form"
import StoreLikes from "@/shared/stores/StoreLikes"
import { serverPaths } from "@shared/PATHS"
import * as style from "@/shared/css/pages/Liked.module.scss"
import { observer } from "mobx-react-lite"
import Button from "@mui/material/Button"
import useInfinitPaginationDoc from "@/shared/hooks/usePagination/useInfinitPaginationDoc"
import { LIKES_ON_PAGE } from "@shared/CONST"
import Paper from "@mui/material/Paper"
import Title from "@/shared/ui/Ttile"
import StorePairs from "@/shared/stores/Store-Pairs"

function Liked() {
  // useGetBy(`${serverPaths.likesGet}/${StoreUser.user?.id}?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}?cursor=${StoreLikes.cursor}`, {callback: (data) => StoreLikes.likedUser(data)})

  useInfinitPaginationDoc({main: serverPaths.likesGet, params: `&lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}`}, (data) => StoreLikes.lazyLoadLiked(data.data), "desc")

  return <section className={style.container}>
    <Title>Вы понравились этим пользователям</Title>
    {/* <button onClick={() => console.log(toJS(StoreLikes.liked),toJS(StoreLikes.likes))}>Store</button> */}
    {/* <button onClick={() => console.log(stop)} style={{position: "fixed"}}>Стоп</button> */}
    <section className={style.container__cards}>
      {StoreLikes.liked?.map(e => {

        const resolveHandle = () => StoreLikes.like(e)
        const rejectHandle = () => StorePairs.rejectUser(e.id)

        return <UsersCardInfo form={e} key={e.id}>
        <Paper className={style['container__cards--actions']}>
          {/* <Link to={`${paths.messages}/${e.id}`}><Button sx={{width: "100%"}} variant="contained">Написать</Button></Link> */}
            
          {/* <Button variant="contained" color="success" onClick={() => StoreLikes.sendLike(e.id)}>{StoreLikes.likes?.sent.find(item => item.liked_userid === e.id) ? 'Убрать лайк' : "Лайкнуть"}</Button> */}
          {/* //@ts-ignore */}
          {/* В БУДУЩЕМ ВЕРНУТЬ ДИСТАНЦИЮ  */}
          {/* <p>Дистанция: {e.distance}</p> */}
          <p>{StoreLikes.likes?.sent.find(item => item.liked_userid === e.id) ? 'ТЫ ЕГО ЛАЙКНУЛ' : "НЕ ЛАЙКАЛ"}</p>
          <Button variant="contained" color="success" onClick={resolveHandle}>Одобрить</Button>
          <Button color="error" variant="contained" onClick={rejectHandle}>Отклонить</Button>
        </Paper>
        </UsersCardInfo>}
      )}
    </section>

  </section>
}

export default observer(Liked)