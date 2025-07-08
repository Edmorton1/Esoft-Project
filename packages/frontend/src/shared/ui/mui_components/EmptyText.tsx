import Typography from "@mui/material/Typography"

export const emptyGrid = (uslovie: number | undefined) => {
  return uslovie ? undefined : {display: "grid", placeItems: "center"}
}

export const emptyFlex = (uslovie: number | undefined) => {
  return uslovie ? undefined : {justifyContent: "center"}
}

type Tinfo = "empty" | "no-authorize"
// {infoType}: {infoType?: Tinfo}

function EmptyText({infoType}: {infoType?: Tinfo}) {
  let text = "Похоже, что здесь пока ничего нет"
  if (infoType === "no-authorize") {
    text = "Эта страница доступна только авторизованным пользователям"
  }

  return <Typography sx={{textAlign: "center", margin: "auto 0"}} color="text.secondary">{text}</Typography>
}

export default EmptyText