import $api from "@/shared/api/api"
import { Tables, tables } from "@s/core/domain/types"
import { one, toCl } from "@shared/MAPPERS"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

function useGetById<T extends tables>(fullUrl: string, resType?: 'array', callback?: (data: any) => void): Tables[T][] | null
function useGetById<T extends tables>(fullUrl: string, resType?: 'single', callback?: (data: any) => void): Tables[T] | null
function useGetById<T extends tables>(fullUrl: string, resType?: 'single' | 'array', callback?: (data: any) => void): Tables[T][] | Tables[T] | null {

  const [value, setValue] = useState<Tables[T][] | Tables[T] | null>(null)
  const [url, params] = fullUrl.split('?')

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = params ? `${url}?${params}` : `/${url}`
      const request = toCl<Tables[T][]>(await $api.get(endpoint))
      
      const result = resType === 'single' ? one(request) : request
      setValue(result)
      callback && callback(result)
    }

    fetchData()
  }, [fullUrl, callback, resType])

  return value
}

export default useGetById

  // const [url, params] = fullUrl.split('?')
  // const { data } = useQuery({
  //   queryKey: [fullUrl],
  //   queryFn: async () => {
  //     const endpoint = params ? `${url}?${params}` : `/${url}`

  //     const raw = await $api.get(endpoint)

  //     const parsed = await toCl<Tables[T][]>(raw)

  //     if (resType === 'single') {
  //       const result = one(parsed)
  //       callback?.(result)
  //       return result
  //     }

  //     callback?.(parsed)
  //     return parsed
  //   },
  //   staleTime: 100000
  // })

          // console.log(new URLSearchParams(params as Record<string, string>).toString())
        // Object.entries(params).map(e => e.join('=')).join('&')

        // ?id=10&sqlparams=limit 20