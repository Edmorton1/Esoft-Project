import StoreLikes from "@/shared/stores/StoreLikes"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import { FormWithDistanse } from "@t/gen/types"
import { observer } from "mobx-react-lite"
import * as style from "@/shared/css/components/UserCard.module.scss"
import { PLACEHOLDER_IMG } from "@shared/PUBLIC"
import Divider from "@mui/material/Divider"
import { ReactNode, useState } from "react"
import ReadMore from "@/shared/ui/components/ReadMore"
import { Tags } from "@t/gen/Users"
import { toJS } from "mobx"
import { BG_ALT } from "@shared/COLORS"

function UsersCardInfo({form, children}: {form: FormWithDistanse, children?: ReactNode}) {
  // console.log("TAGS", toJS(form.tags))
  return <Card component={"article"} className={style.container}>
    {/* <Avatar src={form.avatar!} className={style.container__avatar} /> */}
    <div className={style.container__avatar}>
      <img src={form.avatar ?? PLACEHOLDER_IMG} alt="" />
    </div>
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
      {/* ПОКА КОСТЫЛЬ, ПОТОМ ПОПРАВЛЮ  
      МОЖЕТ ВЫДАТЬ {id: null, tag: null}
      //@ts-ignore */}
      <Typography><strong>Тэги: </strong></Typography>
      
      <ReadMore
        component={form.tags}
        len={4}
        RenderWrap={({children}) => <Box sx={{bgcolor: BG_ALT}}>{children}</Box>}
        renderItem={(e: Tags) => <Chip variant="outlined" key={e.tag} label={e.tag} />} />

      {form.distance && <Typography><strong>Расстояние: </strong>{form.distance} км</Typography>}
      {children}
    </CardContent>
    {/* <img src={form.avatar!} alt="" /> */}
  </Card>
}

export default observer(UsersCardInfo)