import { forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import * as animations from "@app/client/shared/css/animations/ErrorAnimations.module.scss";
import { createPortal } from "react-dom";
const {enter, enterActive, exit, exitActive} = animations

console.log(enter, enterActive, exit, exitActive)

interface Props {
  // nodeRef: React.RefObject<HTMLDivElement | null>;
  usl: boolean;
  children: any;
  id: string;
}

const Toast = forwardRef<HTMLDivElement, Props>(({ usl, children, id }, ref) => {
  return createPortal(
    <CSSTransition
      nodeRef={ref}
      in={usl}
      timeout={300}
      classNames={{enter, enterActive, exit, exitActive}}
      unmountOnExit
      key={id}
    >
      {children}
    </CSSTransition>,
    document.getElementById('root')!
  );
});

Toast.displayName = "Toast";

export default Toast;
