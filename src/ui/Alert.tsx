import React, { useRef } from 'react';
import { observer } from "mobx-react-lite";
import Toast from "@/ui/Toast";
import StoreGlobal from "@/pages/shared/api/Store-Global";
import * as style from "@/css/ToastLike.scss"

function Alert() {
  const nodeRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement | null> }>({});

  return (
    <>
      {StoreGlobal.data.map((e, i) => {
        if (!nodeRefs.current[e.id]) {
          nodeRefs.current[e.id] = React.createRef<HTMLDivElement>();
        }

        return (
          <Toast key={e.id} nodeRef={nodeRefs.current[e.id]} usl={e.visible} id={String(e.id)}>
            <div ref={nodeRefs.current[e.id]} className={style.toast} style={{top: `${(i + 1) * 30}px`, backgroundColor: e.color}}>
              {e.text}
            </div>
          </Toast>
        );
      })}
    </>
  );
}

export default observer(Alert);
