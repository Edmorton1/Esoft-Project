import StoreTalking from "@/pages/Room/ModalTalking/Store-Talking"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { observer } from "mobx-react-lite"
import { memo, useEffect, useState } from "react"

const Clock = () => {
  const [seconds, setSeconds] = useState(0)
  
  useEffect(() => {
    console.log(StoreTalking.timer)
    let timeInterval: NodeJS.Timeout | null = null;

    if (StoreTalking.timer) {
      timeInterval = setInterval(() => setSeconds(prev => prev + 1), 1000)
    } else {
      setSeconds(0)
    }

    return () => {if (timeInterval) clearInterval(timeInterval)}
  }, [StoreTalking.timer])
  
  return <>
  {/* <Button onClick={() => StoreTalking.startTimer()} variant="contained">Начать отчёт</Button>
  <Button onClick={() => StoreTalking.closeTimer()} variant="contained">Закончит отчёт</Button> */}
  <Typography>{Math.floor(seconds / 3600)}:{String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</Typography>
  </>

}

export default observer(Clock)