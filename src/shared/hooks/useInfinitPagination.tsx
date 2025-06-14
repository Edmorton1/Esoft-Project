import $api from "@/shared/api/api"
import { useEffect, useState } from "react"

// interface propsInterface {
//   ref: React.RefObject<HTMLElement | null>,
//   url: string
// }

function useInfinitPagination(ref: React.RefObject<HTMLElement | null>, url: string, firstRender: boolean, callback: (data: any) => void, limit: number) {
  const [stop, setStop] = useState(false)
  const [fetching, setFetching] = useState(false)

  const scrollHandle = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    const target = e.currentTarget as HTMLElement
    if (target.scrollTop < 150 && !stop) {
      setFetching(true)
    }
    // console.log('scrollHeight', target.scrollHeight)
    // console.log('scrollTop', target.scrollTop)
  }

  useEffect(() => {
    console.log(ref.current?.clientHeight)
    if (url.includes("undefined")) return;

    if (fetching || firstRender) {
      $api.get(url)
        .then(data => {data.data.messages.length < limit ? setStop(true) : callback(data)})
        .then(() => setFetching(false))
    }

  }, [fetching, url])

  // РАБОТАЕТ ТОЛЬКО ПРИ ПЕРВОЙ ЗАГРУЗКЕ
  useEffect(() => {
    if (!ref.current) return;

    // console.log("LAYOUT EFFECT", ref.current)
    const files = [
      ...ref.current.querySelectorAll('img'),
      ...ref.current.querySelectorAll('video'),
      ...ref.current.querySelectorAll('audio'),
    ];
    let loaded = 0
    const total = files.length

    const tryScroll = () => {
      requestAnimationFrame(() => {
        ref.current?.scrollTo(0, ref.current.scrollHeight)
      })
    }

    const fallback = setTimeout(() => {
      console.log("ТРАЙ СКРОЛЛ")
      tryScroll()
    }, 1000)

    const onImageLoad = () => {
      loaded++
      console.log("ЛОАДЕД ПЛЮС", loaded)
      if (loaded === total) {
        console.log("ЛОАДЕД === ТОТАЛ")
        tryScroll()
      }
    }

    files.forEach(file => {
      const loaded = ((file instanceof HTMLImageElement && file.complete) || ((file instanceof HTMLVideoElement || file instanceof HTMLAudioElement) && file.readyState >= 2))
      fallback
      if (loaded) {
        onImageLoad()
      } else {
        file.addEventListener('loadeddata', onImageLoad)
        file.addEventListener('error', onImageLoad)
      }
    })

    console.log(loaded, total)
    return () => {
      files.forEach(img => {
        img.removeEventListener('loadeddata', onImageLoad),
        img.removeEventListener('error', onImageLoad)
      })
    }

  }, [ref.current])

  return scrollHandle
}

export default useInfinitPagination
