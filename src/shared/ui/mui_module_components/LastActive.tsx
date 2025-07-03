import useLastActive from "@/shared/hooks/useLastActive"
import Typography from "@mui/material/Typography"

function LastActive({last_active}: {last_active: string | undefined}) {
  const status = useLastActive(last_active)

  return <Typography variant="body2" color="text.secondary">{status}</Typography>
}

export default LastActive