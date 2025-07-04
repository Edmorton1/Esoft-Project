import React, { useRef } from 'react';
import { observer } from "mobx-react-lite";
import Toast from "@/shared/ui/Toast/Toast";
import StoreAlert from "@/shared/ui/Toast/Store-Alert";
import * as style from "@/shared/css/components/ToastLike.module.scss"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

function Alert() {
  const nodeRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement | null> }>({});

  return (
    <>
      {StoreAlert.data.map((data, i) => {
        if (!nodeRefs.current[data.id]) {
          nodeRefs.current[data.id] = React.createRef<HTMLDivElement>();
        }

        const infoEl = <Typography variant='h6'>{data.text}</Typography>

        return (
          <Toast key={data.id} nodeRef={nodeRefs.current[data.id]} usl={data.visible} id={String(data.id)}>
            <Box component={"aside"} ref={nodeRefs.current[data.id]} className={style.toast} bgcolor={data.color ?? "primary.main"} sx={{top: `${(i + 1) * 47}px`, }}>
              {data.url
                ? <Link to={data.url}>
                  {infoEl}
                </Link>
                : infoEl
              }
            </Box>
          </Toast>
        );
      })}
    </>
  );
}

export default observer(Alert);
