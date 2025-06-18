import useDebounce from "@/shared/hooks/useDebounce"
import SearchBase from "@/shared/ui/components/search/SearchBase"
import StoreSearchForm from "@/shared/ui/components/Header/Store-searchForm"
import { useEffect, useState } from "react"
import FindedPanel from "@/shared/ui/components/Header/FindedPanel"
import * as style from "@/shared/css/components/FindedPanel.module.scss"

function SearchHeader() {
  const [debounce, setDebounce] = useDebounce()
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value
    setDebounce(val);
    setValue(val)
    setValue(e.target.value)
  }

  useEffect(() => {
    if (!debounce || debounce.trim().length < 2) return;

    StoreSearchForm.searchForm(debounce)
    console.log(debounce)
  }, [debounce])

  return <section className={style.container}>
    <SearchBase onChange={handleChange} value={value} />
    <FindedPanel />
  </section>
}

export default SearchHeader