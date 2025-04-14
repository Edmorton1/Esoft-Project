import * as style from "@/css/ErrorAuthorize.scss"
import * as animations from "@/css/ErrorAnimations.scss"
import { CSSTransition } from "react-transition-group"

// animations.enter,
// animations.enter_active,
// animations.exit,
// animations.exit_active

function ErrorAuthorize({state, nodeRef}: {state: boolean, nodeRef: any}) {
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
      
      <div ref={nodeRef} className={style.error}>НЕАВТОРИЗОВАН</div>
    </CSSTransition>
  )
}

export default ErrorAuthorize