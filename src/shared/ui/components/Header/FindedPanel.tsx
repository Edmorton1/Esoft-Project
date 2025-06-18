import MicroCard from "@/shared/ui/components/Header/MicroCard"
import StoreSearchForm from "@/shared/ui/components/Header/Store-searchForm"
import { observer } from "mobx-react-lite"
import * as style from "@/shared/css/components/FindedPanel.module.scss"

function FindedPanel() {
  return <div className={style.container__wrapperRow}>
    {StoreSearchForm.finded?.map(e => <MicroCard MicroForm={e} key={e.id} />)}
  </div>
}

export default observer(FindedPanel)