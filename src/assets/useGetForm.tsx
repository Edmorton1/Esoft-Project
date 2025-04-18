import StoreForm from "@/store/Store-Form"
import { Form } from "@s/core/domain/Users"
import { useEffect, useState } from "react"

function useGetForm(id: number): Form {
  const [form, setForm] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      return setForm(await StoreForm.getById(id))
    }

    fetchData()
  }, [])

  return form
}

export default useGetForm