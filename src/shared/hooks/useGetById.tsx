import $api from "@/shared/api/api"
import { Tables, tables } from "@s/core/domain/types"
import { one, toCl, toJSON } from "@shared/MAPPERS"
import { useEffect, useState } from "react"

function useGetById<T extends tables>(fullUrl: string, resType?: 'array', callback?: (data: any) => void): Tables[T][] | null
function useGetById<T extends tables>(fullUrl: string, resType?: 'single', callback?: (data: any) => void): Tables[T] | null
function useGetById<T extends tables>(fullUrl: string, resType?: 'single' | 'array', callback?: (data: any) => void): Tables[T][] | Tables[T] | null {
  const [value, setValue] = useState<Tables[T][] | Tables[T] | null>(null)

  useEffect(() => {
    const [url, params] = fullUrl.split('?')
    const fetchData = async () => {
      if (params) {
        // console.log(new URLSearchParams(params as Record<string, string>).toString())
        // Object.entries(params).map(e => e.join('=')).join('&')

        // ?id=10&sqlparams=limit 20

        const request = await toCl<Tables[T][]>(await $api.get(`${url}?${params}`))
        if (resType == 'single') {
          const result = one(request)
          setValue(result)
          return callback && callback(result)
        }
        callback && callback(request)
        return setValue(request)
      }
      console.log('params')
      const request = await toCl<Tables[T]>(await $api.get(`/${url}`))
      console.log(request)
      callback && callback(request)
      return setValue(request)
    }

    fetchData()
  }, [fullUrl])

  return value
}

export default useGetById