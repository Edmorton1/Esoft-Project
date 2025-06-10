import StoreMessages from "@/pages/Messages/store/Store-Messages"
import $api from "@/shared/api/api"
import StoreUser from "@/shared/stores/Store-User"
import { serverPaths } from "@shared/PATHS"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

// interface propsInterface {
//   ref: React.RefObject<HTMLElement | null>,
//   url: string
// }

function useInfinitPagination(ref: React.RefObject<HTMLElement | null>, url: string) {
  const [stop, setStop] = useState(false)
  const [fetching, setFetching] = useState(false)

  const scrollHandle = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    const target = e.currentTarget as HTMLElement
    if (target.scrollTop < 125 && !stop) {
      setFetching(true)
    }
    // console.log('scrollHeight', target.scrollHeight)
    // console.log('scrollTop', target.scrollTop)
  }

  useEffect(() => {
    console.log(ref.current?.clientHeight)

    if (fetching || StoreMessages.cursor === null) {
      $api.get(url)
        .then(data => {data.data.messages.length !== 0 ? StoreMessages.get(data.data) : setStop(true)})
        .then(() => setFetching(false))
    }

  }, [fetching])

  useEffect(() => {
    if (!ref.current) return;

    // console.log("LAYOUT EFFECT", ref.current)
    ref.current?.scrollTo(0, ref.current.scrollHeight)
  }, [ref.current])

  return scrollHandle
}

export default useInfinitPagination