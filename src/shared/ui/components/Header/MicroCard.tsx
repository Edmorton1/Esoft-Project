import { MicroCardType } from "@/shared/ui/components/Header/Store-searchForm"
import LastActive from "@/shared/ui/components/LastActive"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"

// <Typography variant="body2" color="text.secondary">{last_active}</Typography>

interface propsInterface {
  MicroForm: MicroCardType
}

function MicroCard({MicroForm}: propsInterface) {
  return <Card component={"article"}>
    <CardHeader sx={{p: 1}}
      avatar={<Avatar src={MicroForm.avatar} />}
      title={<Box>
        <Typography>{MicroForm.name}</Typography>
        <Typography>Локация: {MicroForm.city}</Typography>
        <Typography>Возраст: {MicroForm.age}</Typography>
        <LastActive last_active={MicroForm.last_active} />
      </Box>}
    />
  </Card>
}

export default MicroCard