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

function Liked() {
  // useGetBy(`${serverPaths.likesGet}/${StoreUser.user?.id}?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}?cursor=${StoreLikes.cursor}`, {callback: (data) => StoreLikes.likedUser(data)})

  // const handleWrite = () => {}

  // СТАРЫЙ

  const [stop, setStop] = useState(false)
  const [fetching, setFetching] = useState(false)
  
  const scrollHandle = (e: Event) => {
    const target = e.target as Document

    // const innerHeight = window.innerHeight
    // const height = target.documentElement.scrollHeight

    const position = target.documentElement.scrollTop
    const height = target.documentElement.scrollHeight - window.innerHeight

    console.log(height - position)

    if (height - position < 125) {
      setFetching(true)
    }
  }

  useEffect(() => {
    if (fetching || StoreLikes.cursor === null) {
      $api.get(`${serverPaths.likesGet}/${StoreUser.user?.id}?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}?cursor=${StoreLikes.cursor}`)
        .then(data => {data.data.length !== 0 ? StoreLikes.likedUser(data.data) : setStop(true)})
        .then(() => setFetching(false))
    }
  }, [fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandle)

    return () => document.removeEventListener('scroll', scrollHandle)
  }, [])

  // СТАРЫЙ

  return <section className={style.section}>
    {/* <button onClick={() => console.log(toJS(StoreLikes.liked),toJS(StoreLikes.likes))}>Store</button> */}
    <button onClick={() => console.log(StoreLikes.cursor)} style={{position: "fixed"}}>Курсон</button>
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