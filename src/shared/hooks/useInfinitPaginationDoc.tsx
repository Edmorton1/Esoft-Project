import { useEffect, useState } from "react"
import $api from "@/shared/api/api"

function useInfinitPaginationDoc(url: string, firstRender: boolean, callback: (data: any) => void, limit: number) {
  const [stop, setStop] = useState(false)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (fetching || firstRender) {
      $api.get(url)
        .then(data => {console.log('then data', data.data.length === 0); return data})
        .then(data => {data.data.length < limit? setStop(true) : callback(data.data)  })
        .then(() => setFetching(false))
    }
  }, [fetching])

  useEffect(() => {
      const scrollHandle = (e: Event) => {
      const target = e.target as Document

      // const innerHeight = window.innerHeight
      // const height = target.documentElement.scrollHeight

      const position = target.documentElement.scrollTop
      const height = target.documentElement.scrollHeight - window.innerHeight

      console.log(height - position)

      if (height - position < 300 && !stop) {
        console.log('stop', stop)
        console.log(url)
        setFetching(true)
      }
    }

    document.addEventListener('scroll', scrollHandle)

    return () => document.removeEventListener('scroll', scrollHandle)
  }, [stop])
}

export default useInfinitPaginationDoc