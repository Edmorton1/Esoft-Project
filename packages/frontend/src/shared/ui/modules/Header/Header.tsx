import StoreForm from "@app/client/shared/stores/Store-Form"
import { Link, Outlet } from "react-router-dom"
import { paths } from "@app/shared/PATHS"
import ThemeButton from "@app/client/shared/ui/components/ThemeButton"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import { LOGO_IMG_BIG } from "@app/shared/PUBLIC"
import * as style from "@app/client/shared/css/components/Header.module.scss"
import Button from "@mui/material/Button"
import LoginIcon from '@mui/icons-material/Login';
import Avatar from "@mui/material/Avatar"
import StoreLogin from "@app/client/shared/ui/modals/Login/stores/Store-Login"
import { observer } from "mobx-react-lite"
import { toJS } from "mobx"
import * as main from "@app/client/shared/css/modules/Main.module.scss"
import { BG_ALT } from "@app/shared/COLORS"
import StorePostsManager from "@app/client/pages/Profile/stores/Store-Posts-Manager"
import SidebarNav from "@app/client/shared/ui/modules/SidebarNav/SidebarNav"
import SearchHeader from "@app/client/shared/ui/modules/Header/components/SearchHeader"

function Header() {
  return <>
      <AppBar component="header">
        <Toolbar component={"nav"} className={style.header}>

        <div className={style.header__row}>
          <Link to={"/"} style={{display: "flex",alignItems: "center", justifyContent: "center"}}>
            <img src={LOGO_IMG_BIG} style={{height: "61px"}} alt="" />
          </Link>
          <SearchHeader />
        </div>
        
        {/* <button onClick={() => console.log(
          'User: ', toJS(StoreUser.user),
          'Form:', toJS(StoreForm.form),
          'Messages:', toJS(StoreMessagesManager.chats),
          'Likes:', toJS(StoreLikes.likes),
          "Tags:", toJS(StoreTags.tags),
          toJS(StoreUsers.users)
          )}>Вывести сторы
        </button> */}

        <div className={style.header__row}>
          <ThemeButton />
        </div>

        <div className={style.header__row}>
          {/* <NavButton to={paths.settings}>Настройки <SettingsIcon/></NavButton> */}
          {StoreForm.form 
            ? <Link to={`${paths.profile}/${StoreForm.form.id}`}>
                <Avatar src={StoreForm.form.avatar} />
              </Link> 
            : <Button variant="contained" color="plombir" onClick={StoreLogin.openModal} >Войти <LoginIcon /></Button>
          }
        </div>
        
        {/* <NavButton to={`${paths.profile}/2`}>profile 2</NavButton>
        <NavButton to={paths.room}>ROOM</NavButton>
        <button onClick={() => StoreGlobal.sendInfo('asadas', 'blue')}>Инфо</button> */}
        {/* <button onClick={() => console.log({ВСЕ_ЛАЙКИ: toJS(StoreLikes.likes), ЛАЙКЕД: toJS(StoreLikes.liked), ПАРЫ: toJS(StorePairs.pairs)})}>ЛАЙКИ ВСЯ ИНФА</button> */}
        <button onClick={() => console.log(toJS(StorePostsManager))}>Стор постов</button>
        </Toolbar>
      </AppBar>
    
      <Box component={"main"} className={main.main} sx={{backgroundColor: BG_ALT}}>
        <SidebarNav />
        <Outlet />
      </Box>
    </>
}

export default observer(Header)

      // <Box component={"main"} className={main.main}>
      //   <SidebarNav />
      //   <Outlet />
      // </Box>