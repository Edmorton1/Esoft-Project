import StoreGlobal from "@/store/Store-Global";
import storeAuthorization, { responseInterface } from "@/store/Store-User";
import { URL_SERVER } from "@/URLS";
import { toCl } from "@s/infrastructure/db/Mappers";
import axios from "axios";
import { runInAction } from "mobx";

const $api = axios.create({
  baseURL: URL_SERVER,
  withCredentials: true
})

$api.interceptors.request.use((config => {
  const accessToken = localStorage.getItem("accessToken")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
}))

$api.interceptors.request.use((async config => {
  if (
    config.url?.includes('/registration') ||
    config.url?.includes('/login') ||
    config.url?.includes('/logout') ||
    config.method?.toLowerCase() == "get"
  ) return config

  const request: responseInterface = toCl(
    await axios.get(`${URL_SERVER}/refresh`, {

    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  }))
  localStorage.setItem("accessToken", request.accessToken)
  return config
}))

export const noAuthorizeErrorAxios = () => {
  return $api.interceptors.response.use(
    response => response,
    error => {
      if (error.status === 401) {
        console.log(error.status)
        localStorage.removeItem("accessToken")
        runInAction(() => storeAuthorization.user = null)
        StoreGlobal.sendInfo('asdasdasdasd', 'red')
        return Promise.resolve(error)
      }
      return Promise.reject(error)
    }
  )
}

export default $api