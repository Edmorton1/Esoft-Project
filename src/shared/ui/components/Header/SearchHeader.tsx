import useDebounce from "@/shared/hooks/useDebounce"
//@ts-ignore
// ТУТ ПОМЕНЯТЬ search на Search сейчас ругается
import SearchBase from "@/shared/ui/components/Search/SearchBase"
import StoreSearchForm from "@/shared/ui/components/Header/Store-searchForm"
import { useEffect, useState } from "react"
import FindedPanel from "@/shared/ui/components/Header/FindedPanel"
import * as style from "@/shared/css/components/FindedPanel.module.scss"
import { observer } from "mobx-react-lite"

function SearchHeader() {
  // ЗАВТРА ЗАМЕМОИЗИРОВАТЬ last_active ОПТИМИЗИРОВАТЬ ЭТОТ ЭЛЕМЕНТ
  const [debounce, setDebounce] = useDebounce()
  const [value, setValue] = useState('')

  const startSearch = () => {
    if (!debounce || debounce.trim().length < 2) return;

    StoreSearchForm.searchForm(debounce)
    console.log(debounce)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value
    setDebounce(val);
    setValue(val)
    setValue(e.target.value)
  }

  useEffect(() => {
    startSearch()
  }, [debounce])

  const handleFocus = () => {StoreSearchForm.disableHide()}
  const handleBlur = (e: React.FocusEvent<HTMLElement, Element>) => {
    !e.currentTarget.contains(e.relatedTarget) && StoreSearchForm.enableHide()
  }

  return <section className={style.container} onFocusCapture={handleFocus} onBlurCapture={handleBlur}>
    <SearchBase onChange={handleChange} value={value} />
    <FindedPanel search={debounce} />
  </section>
}

export default observer(SearchHeader)