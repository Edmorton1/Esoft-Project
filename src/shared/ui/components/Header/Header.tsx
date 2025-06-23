import StoreForm from "@/shared/stores/Store-Form"
import { Link, NavLink, Outlet } from "react-router-dom"
import { paths } from "@shared/PATHS"
import ThemeButton from "@/shared/ui/components/ThemeButton"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import { LOGO_IMG_BIG } from "@shared/PUBLIC"
import { ReactNode } from "react"
// import * as sharedStyle from "@/shared/css/components/Shared.module.scss"
import * as style from "@/shared/css/components/Header.module.scss"
import Button from "@mui/material/Button"
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import MapIcon from '@mui/icons-material/Map';
import LoginIcon from '@mui/icons-material/Login';
import DomainIcon from '@mui/icons-material/Domain';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from "@mui/material/Avatar"
import StoreLogin from "@/pages/Login/Store-Login"
import { observer } from "mobx-react-lite"
import SearchHeader from "@/shared/ui/components/Header/SearchHeader"
import { toJS } from "mobx"
import StoreUser from "@/shared/stores/Store-User"
import StoreLikes from "@/shared/stores/StoreLikes"
import StoreTags from "@/shared/stores/Store-Tags"
import StoreUsers from "@/pages/Users/widgets/store/Store-Users"
import StoreMessagesManager from "@/pages/Messages/store/Store-Messages-Manager"
import * as main from "@/shared/css/modules/Main.module.scss"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const HeadButton = ({isActive, children}: {isActive: boolean, children: ReactNode}) => (
<Button color={"salmon"} variant={isActive ? "contained" : "outlined"}>
    {children}
  </Button>
)

const NavButton = ({to, children}: {to: string, children: ReactNode}) => <NavLink to={to}>
  {({ isActive }) => <HeadButton isActive={isActive}>{children}</HeadButton>}
  </NavLink>

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
        
        <button onClick={() => console.log(
          'User: ', toJS(StoreUser.user),
          'Form:', toJS(StoreForm.form),
          'Messages:', toJS(StoreMessagesManager.chats),
          'Likes:', toJS(StoreLikes.likes),
          "Tags:", toJS(StoreTags.tags),
          toJS(StoreUsers.users)
          )}>Вывести сторы
        </button>

        <div className={style.header__row}>
          <NavButton to={"/"}>Главная <DomainIcon /></NavButton>
          <NavButton to={paths.registration}>Регистрация <AppRegistrationIcon /></NavButton>
          <NavButton to={paths.messages}>Сообщения <ForumIcon /></NavButton>
          <NavButton to={paths.users}>Пользователи <GroupIcon /></NavButton>
          <NavButton to={paths.map}>MAP <MapIcon /></NavButton>
          <NavButton to={paths.liked}>Liked <ThumbUpIcon /></NavButton>
          <NavButton to={paths.pairs}>Пары <FavoriteIcon /></NavButton>
          <ThemeButton />
        </div>

        <div className={style.header__row}>
          <NavButton to={paths.settings}>Настройки <SettingsIcon/></NavButton>
          {StoreForm.form 
            ? <Link to={`${paths.profile}/${StoreForm.form.id}`}>
                <Avatar src={StoreForm.form.avatar} />
              </Link> 
            : <Button variant="contained" color="salmon" onClick={StoreLogin.openModal} >Войти <LoginIcon /></Button>
          }
        </div>
        
        {/* <NavButton to={`${paths.profile}/2`}>profile 2</NavButton>
        <NavButton to={paths.room}>ROOM</NavButton>
        <button onClick={() => console.log(
          'User: ', toJS(StoreUser.user),
          'Form:', toJS(StoreForm.form),
          'Messages:', toJS(StoreMessages.messages),
          'Likes:', toJS(StoreLikes.likes),
          "Tags:", toJS(StoreTags.tags),
          toJS(StoreUsers.users)
          )}>Вывести сторы
        </button>
        <button onClick={() => StoreGlobal.sendInfo('asadas', 'blue')}>Инфо</button> */}
        </Toolbar>
      </AppBar>
      
      <Box component={"main"} className={main.main} sx={{backgroundColor: "background.alt"}}>
        <Outlet />
      </Box>
    </>
}

export default observer(Header)
