import $api, { noAuthorizeErrorAxios } from "@/shared/api/api"
import StoreUser from "@/shared/stores/Store-User"
import Toast from "@/shared/ui/Toast"
import { useEffect } from "react"
import Alert from "@/shared/ui/Alert"

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