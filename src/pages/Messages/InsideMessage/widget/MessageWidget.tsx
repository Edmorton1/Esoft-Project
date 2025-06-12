import { useRef, useState } from "react"
import StoreMessages from "../../store/Store-Messages"
import MessageHead from "./modules/MessageHead"
import { observer } from "mobx-react-lite"
import { serverPaths } from "@shared/PATHS"
import StoreUser from "@/shared/stores/Store-User"
import useInfinitPagination from "@/shared/hooks/useInfinitPagination"
import { MESSAGE_ON_PAGE } from "@shared/CONST"

function MessageWidget({toid}: {toid: number}) {
  const [editMessage, setEditMessage] = useState<null | number>(null)

  console.log("RERENDER")
  const ref = useRef<HTMLElement>(null)
  const scrollHandle = useInfinitPagination(ref, `${serverPaths.getMessage}/${StoreUser.user?.id}/${toid}?cursor=${StoreMessages.cursor}`, StoreMessages.cursor === null, (data) => StoreMessages.get(data.data), MESSAGE_ON_PAGE)

  return <section ref={ref} style={{height: "700px", overflowY: "auto", overflowX: "hidden"}} onScroll={scrollHandle}>
  <button onClick={() => ref.current?.scrollTo(0, 10000)}>Скролнуть</button>
  {/* return <section> */}
    {StoreMessages.messages?.map(msg => (
      <MessageHead key={msg.id} msg={msg} editing={editMessage === msg.id} setEditMessage={setEditMessage}/>
    ))}
  </section>
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