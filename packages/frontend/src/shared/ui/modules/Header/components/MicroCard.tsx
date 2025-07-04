import { MicroCardType } from "@app/client/shared/ui/modules/Header/stores/Store-searchForm"
import LastActive from "@app/client/shared/ui/mui_module_components/LastActive"
import UnderTypo from "@app/client/shared/ui/mui_components/UnderTypo"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

// <Typography variant="body2" color="text.secondary">{last_active}</Typography>

interface propsInterface {
  MicroForm: MicroCardType,
  handleClick: () => void
}

function MicroCard({MicroForm, handleClick}: propsInterface) {
  const url = `/profile/${MicroForm.id}`

  return <Card component={"article"}>
    <CardHeader sx={{p: 1}}
      avatar={<Link to={url} onClick={handleClick}><Avatar src={MicroForm.avatar} /></Link>}
      title={<Box>
        <Link to={url} onClick={handleClick}><UnderTypo>{MicroForm.name}</UnderTypo></Link>
        <Typography>Локация: {MicroForm.city}</Typography>
        <Typography>Возраст: {MicroForm.age}</Typography>
        {MicroForm.distance && <Typography>Дистаниця: {MicroForm.distance} км</Typography>}
        <LastActive last_active={MicroForm.last_active} />
      </Box>}
    />
  </Card>
}

export default MicroCard