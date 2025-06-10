import StoreLikes from "@/shared/stores/StoreLikes"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import { FormWithDistanse } from "@t/gen/types"
import { observer } from "mobx-react-lite"

function UsersCardInfo({handleLike, form}: {handleLike: () => void, form: FormWithDistanse}) {
  return <Card>
    <Avatar src={form.avatar!} sx={{width: 400, height: 400, borderRadius: 0}} />
    <CardContent sx={{display: "flex", flexDirection: "column"}}>
      <Typography><strong>Имя: </strong>{form.name}</Typography>
      <Typography><strong>Пол: </strong>{form.sex === true ? 'Мужчина' : 'Женщина'}</Typography>
      <Typography><strong>Возраст: </strong>{form.age}</Typography>
      <Typography><strong>Цель: </strong>{form.target}</Typography>
      <Typography><strong>Описание: </strong>{form.description}</Typography>
      <Typography><strong>Город: </strong>{form.city}</Typography>
      <Typography><strong>Тэги: </strong></Typography>
      <Box sx={{bgcolor: "background.alt"}}>
        {form.tags?.map(e => <Chip variant="outlined" key={e.tag} label={e.tag} />)}
      </Box>
      {form.distance && <Typography><strong>Расстояние: </strong>{form.distance} км</Typography>}
      <Button color="success" variant="contained" onClick={handleLike}>{StoreLikes.likes?.sent.some(e => e.liked_userid === form!.id) ? 'Убрать лайк' : 'Лайкнуть'}</Button>
    </CardContent>
    {/* <img src={form.avatar!} alt="" /> */}
  </Card>
}

export default observer(UsersCardInfo)