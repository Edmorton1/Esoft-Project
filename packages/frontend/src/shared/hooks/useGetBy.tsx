
import $api from "@app/client/shared/api/api"
import { tables, Tables } from "@app/types/gen/types"
import { useEffect, useState } from "react"

interface optionsInterface {
  returnOne?: boolean,
  callback?: (data: any) => void,
  cached?: boolean
}

function useGetBy<T extends tables>(fullUrl: string, options?: optionsInterface & {returnOne?: false}): Tables[T][] | null
function useGetBy<T extends tables>(fullUrl: string, options?: optionsInterface & {returnOne: true}): Tables[T] | null
function useGetBy<T extends tables>(fullUrl: string, options?: optionsInterface) {

  const [value, setValue] = useState<any | null>(null)
  const [url, params] = fullUrl.split('?')
  // const endpoint = params ? `${url}?${params}` : `${url}`

  useEffect(() => {
    if (fullUrl.includes('undefined')) return;
    if (options?.cached) return;
    
    const fetchData = async () => {
    const response = await $api.get(params ? `${url}?${params}` : `${url}`)
    console.log(response, 'response')
    const request: Tables[T][] = response.data

    const result = options?.returnOne ? request[0] : request
    setValue(result)
    options?.callback && options?.callback(result)
    return result
    }

    fetchData()
  }, [fullUrl, url, params])

  return value
}

export default useGetBy

  //   fetchData()
  // }, [fullUrl, callback, resType])