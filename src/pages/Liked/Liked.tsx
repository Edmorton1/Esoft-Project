import UsersCardInfo from "@/shared/components/UsersCardInfo"
import useGetBy from "@/shared/hooks/useGetBy"
import StoreForm from "@/shared/stores/Store-Form"
import StoreLikes from "@/shared/stores/StoreLikes"
import { paths, serverPaths } from "@shared/PATHS"
import { Link } from "react-router-dom"
import * as style from "@/shared/css/pages/Liked.module.scss"
import { observer } from "mobx-react-lite"
import StoreUser from "@/shared/stores/Store-User"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import { toJS } from "mobx"
import $api from "@/shared/api/api"
import useInfinitPaginationDoc from "@/shared/hooks/useInfinitPaginationDoc"
import { LIKES_ON_PAGE } from "@shared/CONST"

function Liked() {
  // useGetBy(`${serverPaths.likesGet}/${StoreUser.user?.id}?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}?cursor=${StoreLikes.cursor}`, {callback: (data) => StoreLikes.likedUser(data)})

  useInfinitPaginationDoc(`${serverPaths.likesGet}/${StoreUser.user?.id}?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}&cursor=${StoreLikes.cursor}`, StoreLikes.cursor === null, (data) => StoreLikes.likedUser(data), LIKES_ON_PAGE)

  return <section className={style.section}>
    {/* <button onClick={() => console.log(toJS(StoreLikes.liked),toJS(StoreLikes.likes))}>Store</button> */}
    {/* <button onClick={() => console.log(stop)} style={{position: "fixed"}}>Стоп</button> */}
    {StoreLikes.liked?.map(e => <UsersCardInfo form={e} key={e.id}>
        {/* <div> */}
          <Link to={`${paths.messages}/${e.id}`}>
            <Button sx={{width: "100%"}} variant="contained">Написать</Button>
          </Link>
          
          <Button color="error" variant="contained">Отклонить</Button>
        {/* </div> */}
      </UsersCardInfo>
    )}
  </section>
}

export default observer(Liked)