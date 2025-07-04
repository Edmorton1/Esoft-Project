import FileComponent from "@app/client/pages/Messages/InsideMessage/widget/Main/modules/components/file/FileComponent"
import CloseIcon from '@mui/icons-material/Close';
import * as style from "@app/client/shared/css/modules/FormEdit.module.scss"

function MicroFile({fileLink, onClick}: {fileLink: string, onClick: () => void}) {
  // const onMouseEnter = (e: MouseEventType) => console.log(e)
  // const onMouseLeave = (e: MouseEventType) => console.log(e)

  return <FileComponent fileLink={fileLink} mode="mini">
    <CloseIcon color="plombir" sx={{width: "100px", height: "100px"}} className={style['main__files--close']} onClick={onClick} />
  </FileComponent>
}

export default MicroFile