import $api from "@/shared/api/api"
import { Tables, tables } from "@s/core/domain/types"
import { one, toCl, toJSON } from "@s/infrastructure/db/Mappers"
import { useEffect, useState } from "react"

function useGetById<T extends tables>(table: T, params?: Partial<Tables[T]>, resType?: 'array', callback?: (data: any) => void): Tables[T][] | null
function useGetById<T extends tables>(table: T, params?: Partial<Tables[T]>, resType?: 'single', callback?: (data: any) => void): Tables[T] | null
function useGetById<T extends tables>(table: T, params?: Partial<Tables[T]>, resType?: 'single' | 'array', callback?: (data: any) => void): Tables[T][] | Tables[T] | null {
  const [value, setValue] = useState<Tables[T][] | Tables[T] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (params) {
        // console.log(new URLSearchParams(params as Record<string, string>).toString())
        // console.log(Object.entries(params).map(e => e.join('=')).join('&'))

        // console.log(params)
        const request = await toCl<Tables[T][]>(await $api.get(`/${table}?${Object.entries(params).map(e => e.join('=')).join('&')}`))
        if (resType == 'single') {
          const result = one(request)
          setValue(result)
          return callback && callback(result)
        }
        callback && callback(request)
        return setValue(request)
      }
      console.log('params')
      const request = await toCl<Tables[T]>(await $api.get(`/${table}`))
      console.log(request)
      callback && callback(request)
      return setValue(request)
    }

    fetchData()
  }, [])

  return value
}

export default useGetById