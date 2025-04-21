import * as style from "@/css/ErrorAuthorize.scss"
import * as animations from "@/css/ErrorAnimations.scss"
import { CSSTransition } from "react-transition-group"
import { cloneElement } from "react"

// animations.enter,
// animations.enter_active,
// animations.exit,
// animations.exit_active

function Toast({state, nodeRef, children}: {state: boolean, nodeRef: any, children: any}) {
  return (
    <CSSTransition
    nodeRef={nodeRef}
    in={state}
    timeout={300}
    classNames={{
      enter: animations.enter,
      enterActive: animations.enterActive,
      exit: animations.exit,
      exitActive: animations.exitActive
    }}
    unmountOnExit>
      
      {cloneElement(children, {ref: nodeRef})}
      {/* <div ref={nodeRef} className={style.error}>НЕАВТОРИЗОВАН</div> */}
    </CSSTransition>
  )
}

export default Toast