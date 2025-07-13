// import $api from "@app/client/shared/api/api";
// import { serverPaths } from "@app/shared/PATHS";
import Button, { ButtonProps } from "@mui/material/Button";
import { useState } from "react";

interface propsInterface extends Omit<ButtonProps, "onClick"> {
  timeout: number,
  onClick: NonNullable<ButtonProps['onClick']>
}

function TimeoutButton({timeout, onClick, ...props}: propsInterface) {
  const [disabled, setDisabled] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setDisabled(true)
    setTimeout(() => setDisabled(false), timeout)
    onClick(e)
  }

  return (
    <>
      <Button onClick={handleClick} {...props} disabled={disabled}>{props.children}</Button >
    </>
  );
}

export default TimeoutButton;
