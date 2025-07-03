import Typography from "@mui/material/Typography";

function Title({children}: {children: string}) {
  return <Typography variant="h3" component={"h3"} align="center">{children}</Typography>
}

export default Title