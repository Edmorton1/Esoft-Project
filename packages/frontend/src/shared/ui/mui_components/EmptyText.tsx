import Typography from "@mui/material/Typography"

export const emptyGrid = (uslovie: number | undefined) => {
  return uslovie ? undefined : {display: "grid", placeItems: "center"}
}

export const emptyFlex = (uslovie: number | undefined) => {
  return uslovie ? undefined : {justifyContent: "center"}
}

// type Tinfo = "empty" | "match"
// {infoType}: {infoType?: Tinfo}

function EmptyText() {
  const text = "Похоже, что здесь пока ничего нет"
  // if (infoType === "match") {
  //   text = "Вы не можете писать и звонить этому пользователю, пока не понравитесь ему"
  // }

  return <Typography style={{textAlign: "center"}} color="text.secondary">{text}</Typography>
}

export default EmptyText