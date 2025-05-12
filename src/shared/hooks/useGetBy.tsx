import $api from "@/shared/api/api"
import { Tables } from "@s/core/domain/types"
import { one, toCl } from "@shared/MAPPERS"
import { useQuery } from "@tanstack/react-query"

interface optionsInterface {
    returnOne?: boolean,
    callback?: (data: any) => void,
    qkey?: (string | number)[]
}

function useGetBy<K extends keyof Tables>(
  fullUrl: string,
  options: optionsInterface
): optionsInterface['returnOne'] extends true ? Tables[K][] | null : Tables[K] | null {

  const [url, params] = fullUrl.split('?')
  const endpoint = params ? `${url}?${params}` : `/${url}`
  
  const fetcher = async () => {
    const request = toCl<Tables[K][]>(await $api.get(endpoint))
      
    const result = options.returnOne ? one(request) : request
    options.callback && options.callback(result)
    return result
  }

  const {data} = useQuery({
    queryKey: options.qkey ?? [fullUrl],
    queryFn: fetcher,
    staleTime: options.qkey ? 1000 * 60 * 5 : 0,
    refetchOnMount: options.qkey ? false : true,
  })

  //@ts-ignore
  return data
}

export default useGetBy

  // const [value, setValue] = useState<Tables[T][] | Tables[T] | null>(null)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const endpoint = params ? `${url}?${params}` : `/${url}`
  //     const request = toCl<Tables[T][]>(await $api.get(endpoint))
      
  //     const result = resType === 'single' ? one(request) : request
  //     setValue(result)
  //     callback && callback(result)
  //   }

  //   fetchData()
  // }, [fullUrl, callback, resType])

          // console.log(new URLSearchParams(params as Record<string, string>).toString())
        // Object.entries(params).map(e => e.join('=')).join('&')

        // ?id=10&sqlparams=limit 20