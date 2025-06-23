import StoreMessages from "@/pages/Messages/store/Store-Messages"
import StoreRoom from "@/pages/Room/WebRTC/Store-Room"
import StoreUser from "@/shared/stores/Store-User"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import CardHeader from "@mui/material/CardHeader"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { observer } from "mobx-react-lite"
import CallIcon from '@mui/icons-material/Call';
import MinButton from "@/shared/ui/MinButton"
import { sxStyle } from "@/shared/ui/CircleButton"
import LastActive from "@/shared/ui/components/LastActive"
import { useContext } from "react"
import { MessagesContext } from "@/pages/Messages/InsideMessage/Messages"

function MainHead({toid}: {toid: number}) {
  const StoreMessages = useContext(MessagesContext)!

  const br = 30
  const wh = 50
  const handlerCallClick = () => StoreRoom.makeCall(StoreUser.user!.id, toid)

  console.log(StoreMessages.form?.last_active)

  return <>
    <CardHeader
      sx={{p: 0, pt: 0.5, pl: 0.75, bgcolor: "background.third", borderTopLeftRadius: br, borderTopRightRadius: br}}
      avatar={<Avatar sx={{width: wh, height: wh}} src={StoreMessages.form?.avatar} />}
      title={<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Typography>{StoreMessages.form?.name}</Typography>
          <LastActive last_active={StoreMessages.form?.last_active} />
        </Box>

        <MinButton color="salmon" onClick={handlerCallClick}><CallIcon sx={sxStyle} /></MinButton>
      </Box>
      }
    />
    <Divider />
  </>
}

export default observer(MainHead)
