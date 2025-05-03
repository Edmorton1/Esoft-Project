import $api, { noAuthorizeErrorAxios } from "@/pages/shared/api/api"
import StoreUser from "@/store/Store-User"
import Toast from "@/ui/Toast"
import { useEffect } from "react"
import Alert from "@/ui/Alert"

function Initialization() {

  useEffect(() => {
    noAuthorizeErrorAxios()

    const fetchData = async () => {
      await StoreUser.initial()
    }

    fetchData()
  }, [])
  
  return (
    <Alert />
  )
}

export default Initialization