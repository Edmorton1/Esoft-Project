import Typography from "@mui/material/Typography"

export const emptyGrid = (uslovie: number | undefined) => {
  return uslovie ? undefined : {display: "grid", placeItems: "center"}
}

export const emptyFlex = (uslovie: number | undefined) => {
  return uslovie ? undefined : {justifyContent: "center"}
}

function EmptyText() {
  return <Typography style={{textAlign: "center"}} color="text.secondary">Похоже, что здесь пока ничего нет</Typography>
}

export default EmptyText