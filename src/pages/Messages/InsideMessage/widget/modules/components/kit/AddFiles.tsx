import AttachFileIcon from '@mui/icons-material/AttachFile';
import { sxStyle } from "@/shared/ui/kit/CircleButton";
import Button from "@mui/material/Button";
import { useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const ICON_SIZE = "64px"
const sxButton = {width: ICON_SIZE, height: ICON_SIZE, borderRadius: "50%"}

interface propsInterface {
  onChangeAdd?: (e: any) => void
  register?: UseFormRegisterReturn<any>
}

function AddFiles({register, onChangeAdd}: propsInterface) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  
  const handleFile = () => fileRef.current?.click()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.files
    if (target && target?.length > 3) {
      alert('Нельзя выбрать больше 3 файлов')
      return;
    }
  
    onChangeAdd && onChangeAdd(e)
    
    fileRef.current!.files = target

    register?.onChange(e)

    return setSelectedFiles(e.target.files);
  }

  const FilesRender = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      return Array.from(selectedFiles).map((file, index) => (
        <div key={index}>{file.name}</div>
      ));
    }
  }

  return <>
    {/* <input onChange={ctx.inputNewFile} type="file" multiple /> */}
    <input {...register} ref={e => {register?.ref(e); fileRef.current=e}} type="file" multiple id="files" onChange={onChange} style={{display: "none"}} />
    <Button sx={sxButton} onClick={handleFile} variant="outlined" color="inherit"><AttachFileIcon sx={sxStyle} /></Button>
    <div>
      <FilesRender />
    </div>
  </>
}

export default AddFiles