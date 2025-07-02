import { useEffect, useRef, useState } from "react"
import $api from "@/shared/api/api"
import { AxiosResponse } from "axios"

interface IUrl {
  main: string,
  params?: string
}

function useInfinitPaginationDoc(url: IUrl, callback: (data: AxiosResponse<any, any>) => void, order: "asc" | "desc", cursorField: string) {
  const [stop, setStop] = useState(false)
  const [fetching, setFetching] = useState(false)
  
  const firstRender = useRef<boolean>(true)
  const cursor = useRef<number>(0)
  const urls = useRef<string[]>([])

  // console.log("CURSOR INSIDE", url)

  useEffect(() => {    
    const fetchData = async (request: string) => {
      firstRender.current = false
      try {
        const res = await $api.get(request)

        console.log("ПОГНАЛ", res.data.length, stop)
        // console.log('then data', {FETCHI_FETCH: res.data}, {URL: `${url.main}?cursor=${cursor.current}${url.params ? url.params : ''}`, CURSOR_IN_REF: cursor.current, SETUP_CURSOR: res.data[res.data.length - 1].id})
        
        if (res.data.length === 0) {
          if (firstRender.current) {
            callback(res)
            }
          setStop(true)
        } else {
          cursor.current = order === "desc" ? cursor.current = res.data[res.data.length - 1][cursorField] : cursor.current = res.data[0][cursorField]
          callback(res)
        }
        setFetching(false)
      } catch (err) {
        console.error(err)
        setStop(true)
      } finally {
        setFetching(false)
      }
      
    }

    const request = `${url.main}?cursor=${cursor.current}${url.params ? url.params : ''}`

    console.log("РЕКВЕСТ", request, urls.current)

    if ((fetching || firstRender.current) && !stop && !urls.current.includes(request)) {
    urls.current.push(request)
     fetchData(request)
    }
  }, [fetching, url])

  useEffect(() => {
    const scrollHandle = (e: Event) => {
      console.log("СЛУШАТЕЛЬ РАБОТАЕТ")
      const target = e.target as Document

      const position = target.documentElement.scrollTop
      const height = target.documentElement.scrollHeight - window.innerHeight

      console.log("HEIGHT", height)
      console.log("POSITION", position)
      console.log(height - position)

      if (height - position < 300 && !stop) {
        setFetching(true)
      }
    }

    document.addEventListener('scroll', scrollHandle)

    return () => document.removeEventListener('scroll', scrollHandle)
  }, [stop])

  useEffect(() => {
    const checkAndFetchMore = () => {
      console.log("CHECK ZAPROS", stop)
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // console.log("windowHeight", windowHeight, "docHeight", docHeight);

      if (stop || docHeight > windowHeight) {
        clearInterval(interval)
      } else if (document.documentElement.scrollHeight <= window.innerHeight) {
        setFetching(true);
      }
    };

    const interval = setInterval(() => checkAndFetchMore(), 300);
    
    return () => window.clearInterval(interval)
    // checkAndFetchMore();

  }, [stop])
}

export default useInfinitPaginationDoc