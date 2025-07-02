import StoreForm from "@/shared/stores/Store-Form"
import { Link, Outlet } from "react-router-dom"
import { paths } from "@shared/PATHS"
import ThemeButton from "@/shared/ui/components/ThemeButton"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import { LOGO_IMG_BIG } from "@shared/PUBLIC"
import * as style from "@/shared/css/components/Header.module.scss"
import Button from "@mui/material/Button"
import LoginIcon from '@mui/icons-material/Login';
import Avatar from "@mui/material/Avatar"
import StoreLogin from "@/pages/Login/Store-Login"
import { observer } from "mobx-react-lite"
import SearchHeader from "@/shared/ui/components/Header/SearchHeader"
import { toJS } from "mobx"
import StoreUser from "@/shared/stores/Store-User"
import StoreLikes from "@/shared/stores/StoreLikes"
// import StoreTags from "@/shared/stores/Store-Tags"
import StoreUsers from "@/pages/Users/widgets/store/Store-Users"
import StoreMessagesManager from "@/pages/Messages/store/Store-Messages-Manager"
import * as main from "@/shared/css/modules/Main.module.scss"
import SidebarNav from "@/shared/ui/components/SidebarNav/SidebarNav"
import { BG_ALT } from "@shared/COLORS"
import StorePairs from "@/shared/stores/Store-Pairs"
import StorePostsManager from "@/pages/Profile/stores/Store-Posts-Manager"

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
            : <Button variant="contained" color="salmon" onClick={StoreLogin.openModal} >Войти <LoginIcon /></Button>
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