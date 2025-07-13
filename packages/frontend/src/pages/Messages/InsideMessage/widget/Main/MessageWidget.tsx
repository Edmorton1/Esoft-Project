import { useContext, useRef, useState } from "react"
import MessageHead from "./modules/MessageHead"
import { observer } from "mobx-react-lite"
import { serverPaths } from "@app/shared/PATHS"
import useInfinitPagination from "@app/client/shared/hooks/usePagination/useInfinitPagination"
import * as style from "@app/client/shared/css/pages/MessagesInside.module.scss"
import Box from "@mui/material/Box"
import { MessagesContext } from "@app/client/pages/Messages/InsideMessage/Messages"
import { BG_THIRD } from "@app/shared/COLORS"
import EmptyText, { emptyGrid } from "@app/client/shared/ui/mui_components/EmptyText"

function MessageWidget({toid}: {toid: number}) {
  const StoreMessages = useContext(MessagesContext)!
  
  const [editMessage, setEditMessage] = useState<null | number>(null)

  const ref = useRef<HTMLElement>(null)
  
  console.log(`ссылка ${serverPaths.getMessage}/${toid}?cursor=${StoreMessages.cursor}`)

  const scrollHandle = useInfinitPagination(ref, `${serverPaths.getMessage}/${toid}?cursor=${StoreMessages.cursor}`, StoreMessages.cursor === null, StoreMessages.get)

  return <Box ref={ref} className={style.widget} component="section" bgcolor={BG_THIRD} onScroll={scrollHandle} sx={emptyGrid(StoreMessages.messages?.length)}>
    {StoreMessages.messages?.length
      ? StoreMessages.messages?.map(msg => (
        <MessageHead key={msg.id} msg={msg} editing={editMessage === msg.id} setEditMessage={setEditMessage}/>
      ))
      : <EmptyText />
    }
    
  </Box>
}

export default observer(MessageWidget)

  // useLayoutEffect(() => {
  //   // window.scrollTo(0, document.body.scrollHeight)

  //   ref.current?.addEventListener('scroll', scrollHandle)

  //   return () => ref.current?.removeEventListener('scroll', scrollHandle)
  // }, [])

    // useGetBy(`${serverPaths.getMessage}/${StoreUser.user?.id}/${toid}`, {callback: (data) => StoreMessages.initial(data)})

  // const scrollHandle = (e: any) => {
  //   // if (e.target.documentElement.scrollTop === 0) {
  //   //   setFetching(true)
  //   // }
  //   console.log(e)
  //   // console.log('scrollHeight', e.target.documentElement.scrollHeight)
  //   // console.log('scrollTop' ,e.target.documentElement.scrollTop)
  //   // console.log('innerHeight', window.innerHeight)
  // }

    // useEffect(() => {
  //   if (!ref.current) return;

  //   const beforeLoadScroll = ref.current.scrollTop;
  //   const beforeLoadHeight = ref.current.scrollHeight;

  //   const heightDiff = ref.current.scrollHeight - beforeLoadHeight;
  //   ref.current?.scrollTo({
  //     top: beforeLoadScroll + heightDiff,
  //     behavior: "smooth"
  //   })
  // }, [StoreMessages.messages?.length])

  // NEW
    // const [stop, setStop] = useState(false)
    // const [fetching, setFetching] = useState(false)

  // const scrollHandle = (e: React.UIEvent<HTMLElement, UIEvent>) => {
  //   const target = e.currentTarget as HTMLElement

  //   if (target.scrollTop < 125 && !stop) {
  //     setFetching(true)
  //   } else if (!stop) {
  //     console.log('scrollHeight', target.scrollHeight)
  //     console.log('scrollTop', target.scrollTop)
  //   }
  // }

  // useEffect(() => {
  //   console.log(ref.current?.clientHeight)

  //   if (fetching || StoreMessages.cursor === null) {
  //     $api.get(`${serverPaths.getMessage}/${StoreUser.user?.id}/${toid}?cursor=${StoreMessages.cursor}`)
  //       .then(data => {data.data.messages.length !== 0 ? StoreMessages.get(data.data) : setStop(true)})
  //       .then(() => setFetching(false))
  //   }

  // }, [fetching])

  // useLayoutEffect(() => {
  //   console.log("LAYOUT EFFECT", ref.current)
  //   ref.current?.scrollTo(0, ref.current.scrollHeight)
  // }, [ref.current])