import StoreError from "@/errors/Store-Error";
import * as style from "@/shared/css/pages/Fallback.module.scss"
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { LOGO_IMG_BIG } from "@shared/PUBLIC";
import { useNavigate } from "react-router-dom";

function Fallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  const navigate = useNavigate();

  const handleReset = () => {
    navigate("/")
    setTimeout(() => {StoreError.resetErrorBoundary();
    resetErrorBoundary()}, 0)
  };

  return (
    <div className={style.container}>
      <Paper component={"div"} className={style.container__message}>
        <img src={LOGO_IMG_BIG} alt="" />
        <Typography variant="h4">{error.message}</Typography>
        <Button onClick={handleReset} variant="contained" sx={{ width: "100%" }}>
          На главную
        </Button>
      </Paper>
    </div>
  );
}


export default Fallback