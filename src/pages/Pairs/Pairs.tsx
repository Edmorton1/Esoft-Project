import StorePairs from "@/pages/Pairs/store/Store-Pairs"
import useGetBy from "@/shared/hooks/useGetBy"
import { paths, serverPaths } from "@shared/PATHS"
import * as style from "@/shared/css/pages/Pairs.module.scss"
import CardHeader from "@mui/material/CardHeader"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Subtitle from "@/shared/ui/Subtitles"
import ForumIcon from '@mui/icons-material/Forum';
import PhoneIcon from '@mui/icons-material/Phone';
import LastActive from "@/shared/ui/components/LastActive"
import { Link } from "react-router-dom"
import StoreRoom from "@/pages/Room/WebRTC/Store-Room"
import StoreUser from "@/shared/stores/Store-User"
import Title from "@/shared/ui/Ttile"

function Pairs() {
  useGetBy(`${serverPaths.likesPairs}`, {callback: (data) => StorePairs.initial(data)})

  return <section>
    <Title>Вы понравились друг другу</Title>
    
    <section className={style.container}>
      {StorePairs.forms.map(e => {
      const handleClick = () => StoreRoom.makeCall(StoreUser.user!.id, e.id)

      return <Paper key={e.id}>
          <CardHeader
            avatar={<Avatar src={e.avatar} />}
            title={<>
            <Typography>{e.name}</Typography>
            <LastActive last_active={e.last_active} />
            <div className={style.container__actions}>
              <Link to={`${paths.messages}/${e.id}`}><Subtitle><ForumIcon /> Написать</Subtitle></Link>
              <Subtitle onClick={handleClick}><PhoneIcon />Позвонить</Subtitle>
            </div>
            </>}
          />
        </Paper>
      })}
    </section>

  </section> 
}

export default Pairs