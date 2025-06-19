import MicroCard from "@/shared/ui/components/Header/MicroCard"
import StoreSearchForm from "@/shared/ui/components/Header/Store-searchForm"
import { observer } from "mobx-react-lite"
import * as style from "@/shared/css/components/FindedPanel.module.scss"
import { FORM_SEARCH_LIMIT } from "@shared/CONST"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { paths } from "@shared/PATHS"

interface propsInterface {
  search: string | null
}

function FindedPanel({search}: propsInterface) {
  const handleClick = () => StoreSearchForm.enableHide()
  const finded = StoreSearchForm.finded

  return !StoreSearchForm.hide && finded?.length > 0 && <Box component={"div"} bgcolor={"background.paper"} className={style.container__wrapperRow} tabIndex={-1}>
    {finded?.map(e => <MicroCard MicroForm={e} key={e.id} />)}
    {finded?.length >= FORM_SEARCH_LIMIT && <Link to={`${paths.users}?name=${search}`}><Button onClick={handleClick} variant="contained" color="inherit">Показать ещё</Button></Link>}
  </Box>
}

export default observer(FindedPanel)