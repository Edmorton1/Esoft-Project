// import $api from "@app/client/shared/api/api";
// import { serverPaths } from "@app/shared/PATHS";
import Button, { ButtonProps } from "@mui/material/Button";
import { useState } from "react";

interface propsInterface extends Omit<ButtonProps, "onClick" | "onSubmit"> {
  timeout?: number,
  onClick?: ButtonProps['onClick'],
}

function TimeoutButton({timeout = 1000, onClick = () => {}, ...props}: propsInterface) {
  const [disabled, setDisabled] = useState(false)

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   setDisabled(true)
  //   setTimeout(() => setDisabled(false), timeout)
    
  // }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick(e)
      
    requestAnimationFrame(() => {
      setDisabled(true)
      setTimeout(() => setDisabled(false), timeout)
    })
  }

  return <Button {...props} disabled={disabled} onClick={handleClick}>{props.children}</Button >
}

export default TimeoutButton;
