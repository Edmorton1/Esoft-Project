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
import { BG_THIRD } from "@shared/COLORS"
import { Link } from "react-router-dom"
import { paths } from "@shared/PATHS"
import UnderTypo from "@/shared/ui/components/mui_styled/UnderTypo"

function MainHead({toid}: {toid: number}) {
  const StoreMessages = useContext(MessagesContext)!

  const br = 30
  const wh = 50
  const handlerCallClick = () => StoreRoom.makeCall(StoreUser.user!.id, toid)

  // console.log(StoreMessages.form?.last_active)
  console.log({ГОЛОВА_ЮЗЕР: StoreMessages.form})
  const link = `${paths.profile}/${StoreMessages.form?.id}`

  return <>
    <CardHeader
      sx={{p: 0, pt: 0.5, pl: 0.75, bgcolor: BG_THIRD, borderTopLeftRadius: br, borderTopRightRadius: br}}
      avatar={<Link to={link}><Avatar sx={{width: wh, height: wh}} src={StoreMessages.form?.avatar} /></Link>}
      title={<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Link to={link}>
            <UnderTypo>{StoreMessages.form?.name}</UnderTypo>
          </Link>
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
