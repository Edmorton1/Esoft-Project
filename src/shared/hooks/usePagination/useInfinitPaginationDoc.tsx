import { useEffect, useRef, useState } from "react"
import $api from "@/shared/api/api"
import { AxiosResponse } from "axios"

function useInfinitPaginationDoc(url: string, firstRender: boolean, callback: (data: AxiosResponse<any, any>) => void) {
  const [stop, setStop] = useState(false)
  const [fetching, setFetching] = useState(false)

  console.log("CURSOR INSIDE", url)

  useEffect(() => {
    // if (url.includes("undefined")) return;

    //@ts-ignore
    // ПРОДУМАТЬ ЧТО ЕСЛИ ВЫСОТА ЭКРАНА НЕ ДОСТАЁТ ДО ПРЕДЕЛА ПИКСЕЙЛЕЙ, ТОГДА ЗАГРУЖАТЬ ВСЁ РАВНО

    if (fetching || firstRender) {
      $api.get(url)
        .then(data => {console.log('then data', {FETCHI_FETCH: data.data}); return data})
        .then(data => {
          if (data.data.length === 0) {
            if (firstRender) {
              callback(data)
            }
            setStop(true)
          } else {
            callback(data)
          }
          // data.data.length < limit? setStop(true) : callback(data.data)
        })
        .then(() => setFetching(false))

        .catch(() => setStop(false))
      // requestPagination(url, firstRender, callback, setStop, setFetching)
    }
  }, [fetching, url])

  useEffect(() => {
      const scrollHandle = (e: Event) => {
      const target = e.target as Document

      // const innerHeight = window.innerHeight
      // const height = target.documentElement.scrollHeight

      const position = target.documentElement.scrollTop
      const height = target.documentElement.scrollHeight - window.innerHeight

      console.log(height - position)

      if (height - position < 300 && !stop) {
        // console.log('stop', stop)
        console.log("CURSOR OUTSIDE", url)
        setFetching(true)
      }
    }

    document.addEventListener('scroll', scrollHandle)

    return () => document.removeEventListener('scroll', scrollHandle)
  }, [stop])
}

export default useInfinitPaginationDoc