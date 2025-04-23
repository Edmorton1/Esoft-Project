import React, { forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import * as animations from "@/css/ErrorAnimations.scss"; // Анимации для появления/исчезновения
import { createPortal } from "react-dom";

interface props {
  nodeRef: React.RefObject<HTMLDivElement | null>,
  usl: boolean,
  children: any,
  id: string
}

const Toast = forwardRef<HTMLDivElement, { nodeRef: React.RefObject<HTMLDivElement | null>, usl: boolean, children: any, id: string }>(
  ({ nodeRef, usl, children, id }, ref) => {
    return createPortal(
      <CSSTransition
        nodeRef={nodeRef}
        in={usl}
        timeout={300}
        classNames={{
          enter: animations.enter,
          enterActive: animations.enterActive,
          exit: animations.exit,
          exitActive: animations.exitActive,
        }}
        unmountOnExit
        key={id}
      >
        {children}
      </CSSTransition>,
      document.getElementById('root')!
    );
  }
);

export default Toast;
