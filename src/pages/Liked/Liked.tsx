import UsersCardInfo from "@/shared/ui/components/UsersCardInfo"
import StoreForm from "@/shared/stores/Store-Form"
import StoreLikes from "@/shared/stores/StoreLikes"
import { paths, serverPaths } from "@shared/PATHS"
import { Link } from "react-router-dom"
import * as style from "@/shared/css/pages/Liked.module.scss"
import { observer } from "mobx-react-lite"
import Button from "@mui/material/Button"
import useInfinitPaginationDoc from "@/shared/hooks/useInfinitPaginationDoc"
import { LIKES_ON_PAGE } from "@shared/CONST"
import Paper from "@mui/material/Paper"
import Title from "@/shared/ui/Ttile"

function Liked() {
  // useGetBy(`${serverPaths.likesGet}/${StoreUser.user?.id}?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}?cursor=${StoreLikes.cursor}`, {callback: (data) => StoreLikes.likedUser(data)})

  useInfinitPaginationDoc(`${serverPaths.likesGet}?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}&cursor=${StoreLikes.cursor}`, StoreLikes.cursor === null, (data) => StoreLikes.likedUser(data), LIKES_ON_PAGE)

  return <section className={style.container}>
    <Title>Вы понравились этим пользователям</Title>
    {/* <button onClick={() => console.log(toJS(StoreLikes.liked),toJS(StoreLikes.likes))}>Store</button> */}
    {/* <button onClick={() => console.log(stop)} style={{position: "fixed"}}>Стоп</button> */}
    <section className={style.container__cards}>
      {StoreLikes.liked?.map(e => <UsersCardInfo form={e} key={e.id}>
        <Paper className={style['container__cards--actions']}>
          <Link to={`${paths.messages}/${e.id}`}>
            <Button sx={{width: "100%"}} variant="contained">Написать</Button>
          </Link>
            
          <Button variant="contained" color="success" onClick={() => StoreLikes.sendLike(e.id)}>{StoreLikes.likes?.sent.find(item => item.liked_userid === e.id) ? 'Убрать лайк' : "Лайкнуть"}</Button>
          <Button color="error" variant="contained">Отклонить</Button>
        </Paper>
        </UsersCardInfo>
      )}
    </section>

  </section>
}

export default observer(Liked)