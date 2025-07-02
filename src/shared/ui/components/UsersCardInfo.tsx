import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import { observer } from "mobx-react-lite"
import * as style from "@/shared/css/components/UserCard.module.scss"
import Divider from "@mui/material/Divider"
import { ReactNode } from "react"
import ReadMore from "@/shared/ui/components/ReadMore"
import { Form, Tags } from "@t/gen/Users"
import { BG_ALT } from "@shared/COLORS"
import { paths } from "@shared/PATHS"
import AvatarImg from "@/shared/ui/components/mui_styled/AvatarImg"
import { Link } from "react-router-dom"
import { toJS } from "mobx"

function UsersCardInfo({formRaw, children}: {formRaw: Form, children?: ReactNode}) {
  const form = {...formRaw, tags: formRaw.tags?.map(e => e.tag).filter(e => e)}
  // console.log("TAGS", toJS(form.tags))
  const url = `${paths.profile}/${form.id}`
  console.log(toJS(form))

  return <Card component={"article"} className={style.container}>
    {/* <Avatar src={form.avatar!} className={style.container__avatar} /> */}
    <Link to={url}>
      <Box sx={{padding: "12px", height: "350px"}}>
        <AvatarImg src={form.avatar} className={style.container__avatar} />
      </Box>
    </Link>

  
    <CardContent sx={{bgcolor: BG_ALT}} className={style.container__content}>
      <Divider />
      <Typography><strong>Имя: </strong>{form.name}</Typography>
      <Divider />
      <Typography><strong>Пол: </strong>{form.sex === true ? 'Мужчина' : 'Женщина'}</Typography>
      <Divider />
      <Typography><strong>Возраст: </strong>{form.age}</Typography>
      <Divider />
      <Typography><strong>Цель: </strong>{form.target}</Typography>
      <Divider />
        {form.description && <Typography>
          <strong>Описание: </strong>
          <ReadMore component={form.description} len={110} />
        </Typography>}
      <Divider />
      <Typography><strong>Город: </strong>{form.city}</Typography>
      <Divider />
      {form.tags && form.tags?.length > 0 && <>
      <Typography><strong>Тэги: </strong></Typography>
      
      <ReadMore
        component={form.tags}
        len={4}
        RenderWrap={({children}) => <Box sx={{bgcolor: BG_ALT}}>{children}</Box>}
        renderItem={(e: string) => <Chip variant="outlined" key={e} label={e} />} />

      </>}

      {form.distance && <Typography><strong>Расстояние: </strong>{form.distance} км</Typography>}
      {children}
    </CardContent>
    {/* <img src={form.avatar!} alt="" /> */}
  </Card>
}

export default observer(UsersCardInfo)