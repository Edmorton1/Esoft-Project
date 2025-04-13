import { URL_SERVER } from "@/URLS";
import axios from "axios";

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

export default $api