import { useEffect, useRef, useState } from "react"
import $api from "@/shared/api/api"
import { AxiosResponse } from "axios"

interface IUrl {
  main: string,
  params?: string
}

interface ICursor {
  cursor: number,
  // УСТАНОВЛЕНИЕ КУРСОРА
  setCursor: (cursor: number) => void,
  // ИСТОРИЯ ЗАПРОСОВ
  history: string[],
  // ДОБАВЛЕНИЕ В ИСТОРИЮ
  setHistory: (url: string) => void,
  stop: boolean,
  setStop: () => void
}

function useInfinitPaginationDoc(url: IUrl, store: ICursor, callback: (data: AxiosResponse<any, any>) => void, order: "asc" | "desc", cursorField: string) {
console.log("РЕРЕНДЕР ИНФИНИТ ПАГ", url, store, callback, order, cursorField)
// function useInfinitPaginationDoc(url: IUrl, callback: (data: AxiosResponse<any, any>) => void, order: "asc" | "desc", cursorField: string) {
  const [fetching, setFetching] = useState(false)
  
  const firstRender = useRef<boolean>(true)
  // const cursor = useRef<number>(0)
  // const urls = useRef<string[]>([])

  // console.log("CURSOR INSIDE", url)

  useEffect(() => {    
    const fetchData = async (request: string) => {
      firstRender.current = false
      try {
        const res = await $api.get(request)

        // console.log("ПОГНАЛ", res.data.length, store.stop)
        // console.log('then data', {FETCHI_FETCH: res.data}, {URL: `${url.main}?cursor=${cursor.current}${url.params ? url.params : ''}`, CURSOR_IN_REF: cursor.current, SETUP_CURSOR: res.data[res.data.length - 1].id})
        
        if (res.data.length === 0) {
          if (firstRender.current) {
            callback(res)
            }
          store.setStop()
        } else {
          order === "desc" ? store.setCursor(res.data[res.data.length - 1][cursorField]) : store.setCursor(res.data[0][cursorField])
          callback(res)
        }
        setFetching(false)
      } catch (err) {
        console.error(err)
        store.setStop()
      } finally {
        setFetching(false)
      }
      
    }

    const request = `${url.main}?cursor=${store.cursor}${url.params ? url.params : ''}`

    console.log("РЕКВЕСТ", request, store.history)

    if ((fetching || firstRender.current) && !store.stop && !store.history.includes(request)) {
    store.setHistory(request)
     fetchData(request)
    }
  }, [fetching, url])

  useEffect(() => {
    const scrollHandle = (e: Event) => {
      // console.log("СЛУШАТЕЛЬ РАБОТАЕТ")
      const target = e.target as Document

      const position = target.documentElement.scrollTop
      const height = target.documentElement.scrollHeight - window.innerHeight

      // console.log("HEIGHT", height)
      // console.log("POSITION", position)
      // console.log(height - position)

      if (height - position < 300 && !store.stop) {
        setFetching(true)
      }
    }

    document.addEventListener('scroll', scrollHandle)

    return () => document.removeEventListener('scroll', scrollHandle)
  }, [store.stop])

  useEffect(() => {
    const checkAndFetchMore = () => {
      // console.log("CHECK ZAPROS", store.stop)
      const winHeight = window.innerHeight;
      const winScroll = document.documentElement.scrollHeight;

      // console.log("windowHeight", windowHeight, "docHeight", docHeight);

      if (store.stop || winScroll > winHeight) {
        clearInterval(interval)
      } else if (document.documentElement.scrollHeight <= window.innerHeight) {
        setFetching(true);
      }
    };

    const interval = setInterval(() => checkAndFetchMore(), 300);
    
    return () => window.clearInterval(interval)
    // checkAndFetchMore();

  }, [store.stop])
}

export default useInfinitPaginationDoc