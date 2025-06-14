import StoreForm from "@/shared/stores/Store-Form"
import StoreMessages from "@/pages/Messages/store/Store-Messages"
import StoreTags from "@/shared/stores/Store-Tags"
import StoreUser from "@/shared/stores/Store-User"
import StoreUsers from "@/pages/Users/widgets/store/Store-Users"
import StoreLikes from "@/shared/stores/StoreLikes"
import { toJS } from "mobx"
import { Link, NavLink, Outlet } from "react-router-dom"
import { paths } from "@shared/PATHS"
import classNames from "classnames"
import StoreGlobal from "@/shared/api/Store-Global"
import ThemeButton from "@/shared/components/ThemeButton"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import { LOGO_IMG_BIG } from "@shared/PUBLIC"
import { ReactNode } from "react"

// import * as sharedStyle from "@/shared/css/components/Shared.module.scss"
import * as style from "@/shared/css/components/Header.module.scss"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Search from "@/shared/ui/kit/search/Search"

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import MapIcon from '@mui/icons-material/Map';
import LoginIcon from '@mui/icons-material/Login';
import DomainIcon from '@mui/icons-material/Domain';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useTheme } from "@mui/material/styles"
import CardHeader from "@mui/material/CardHeader"
import Avatar from "@mui/material/Avatar"

const HeadButton = ({isActive, children}: {isActive: boolean, children: ReactNode}) => {
  const theme = useTheme()

  return <Button color={"salmon"} variant={isActive ? "contained" : "outlined"}>
    {children}
  </Button>
}

const NavButton = ({to, children}: {to: string, children: ReactNode}) => <NavLink to={to}>
  {({ isActive }) => <HeadButton isActive={isActive}>{children}</HeadButton>}
  </NavLink>

function Header() {

  return <>
      <AppBar component="header">
        <Toolbar component={"nav"} className={style.header}>

        <div className={style.header__row}>
          <Link to={"/"}>
            <img src={LOGO_IMG_BIG} style={{height: "61px"}} alt="" />
          </Link>
          <Search />
        </div>

        <div className={style.header__row}>
          <NavButton to={"/"}>Главная <DomainIcon /></NavButton>
          <NavButton to={paths.registration}>Регистрация <AppRegistrationIcon /></NavButton>
          <NavButton to={paths.messages}>Сообщения <ForumIcon /></NavButton>
          <NavButton to={paths.users}>Пользователи <GroupIcon /></NavButton>
          <NavButton to={paths.map}>MAP <MapIcon /></NavButton>
          <NavButton to={paths.liked}>Liked <FavoriteIcon/></NavButton>
          <ThemeButton />
        </div>

        <div className={style.header__row}>
          {StoreForm.form 
            ? <CardHeader
              title={StoreForm.form.name}
              avatar={<Avatar src={StoreForm.form.avatar} />}
            />
            : <NavButton to={paths.login}>Войти <LoginIcon /></NavButton>
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
      
      <Box component={"main"} sx={{backgroundColor: "background.alt"}}>
        <Outlet />
      </Box>
    </>
}

export default Header

  // return <>
  //     <AppBar position="fixed">
  //       <Toolbar>
  //       {/* <img src={LOGO_IMG_BIG} alt="" /> */}
  //       <nav>
  //         <NavLink to={"/"}>{({ isActive }) => <button className={classNames({[style.active]: isActive})}>Главная</button>}</NavLink>
  //         <Link to={paths.registration}><button>Регистрация</button></Link>
  //         <Link to={paths.login}><button>Войти</button></Link>
  //         <Link to={paths.messages}><button>Сообщения</button></Link>
  //         <Link to={paths.users}><button>Пользователи</button></Link>
  //         <Link to={`${paths.profile}/2`}><button>profile 2</button></Link>
  //         <Link to={paths.room}><button>ROOM</button></Link>
  //         <Link to={paths.map}><button>MAP</button></Link>
  //         <Link to={paths.liked}><button>Liked</button></Link>
  //         <button onClick={() => console.log(
  //           'User: ', toJS(StoreUser.user),
  //           'Form:', toJS(StoreForm.form),
  //           'Messages:', toJS(StoreMessages.messages),
  //           'Likes:', toJS(StoreLikes.likes),
  //           "Tags:", toJS(StoreTags.tags),
  //           toJS(StoreUsers.users)
  //           )}>Вывести сторы
  //         </button>
  //         <button onClick={() => StoreGlobal.sendInfo('asadas', 'blue')}>Инфо</button>
  //         <ThemeButton />
  //       </nav>
  //       </Toolbar>
  //     </AppBar>
      
  //     <Box component={"main"} sx={{backgroundColor: "background.alt"}}>
  //       <Outlet />
  //     </Box>
  //   </>