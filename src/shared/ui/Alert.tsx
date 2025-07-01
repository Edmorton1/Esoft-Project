import React, { useRef } from 'react';
import { observer } from "mobx-react-lite";
import Toast from "@/shared/ui/Toast";
import StoreAlert from "@/shared/api/Store-Alert";
import * as style from "@/shared/css/components/ToastLike.module.scss"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Alert() {
  const nodeRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement | null> }>({});

  return (
    <>
      {StoreAlert.data.map((e, i) => {
        if (!nodeRefs.current[e.id]) {
          nodeRefs.current[e.id] = React.createRef<HTMLDivElement>();
        }

        return (
          <Toast key={e.id} nodeRef={nodeRefs.current[e.id]} usl={e.visible} id={String(e.id)}>
            <Box component={"aside"} ref={nodeRefs.current[e.id]} className={style.toast} bgcolor={e.color ?? "primary.main"} sx={{top: `${(i + 1) * 47}px`, }}>
              <Typography variant='h6'>{e.text}</Typography>
            </Box>
          </Toast>
        );
      })}
    </>
  );
}

export default observer(Alert);
