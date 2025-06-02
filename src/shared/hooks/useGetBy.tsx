
import $api from "@/shared/api/api"
import { tables, Tables } from "@t/gen/types"
import { one, toCl } from "@shared/MAPPERS"
import { useEffect, useState } from "react"

interface optionsInterface {
    returnOne?: boolean,
    callback?: (data: any) => void,
}

function useGetBy<T extends tables>(fullUrl: string, options?: optionsInterface & {returnOne?: false}): Tables[T][] | null
function useGetBy<T extends tables>(fullUrl: string, options?: optionsInterface & {returnOne: true}): Tables[T] | null
function useGetBy<T extends tables>(fullUrl: string, options?: optionsInterface) {

  const [value, setValue] = useState<any | null>(null)
  const [url, params] = fullUrl.split('?')
  const endpoint = params ? `${url}?${params}` : `${url}`

  useEffect(() => {
    const fetchData = async () => {
    const response = await $api.get(endpoint)
      console.log(response, 'response')
    const request = toCl<Tables[T][]>(response)

    const result = options?.returnOne ? one(request) : request
    setValue(result)
    options?.callback && options?.callback(result)
    return result
    }

    fetchData()
  }, [fullUrl])

  return value
}

export default useGetBy

  //   fetchData()
  // }, [fullUrl, callback, resType])