import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useFormContext } from "react-hook-form";
import { ProfileType } from "@/pages/Settings/widgets/schema/Schemas";
import { useState } from "react";

function TagsRow() {
  const [input, setInput] = useState('')
  const {setValue, watch} = useFormContext<ProfileType>()

  const tags = watch('tags') || []
  console.log(tags)
  
  return <FormControl>
    <FormLabel>Тэги</FormLabel>
      <Box sx={{display: "flex", gap: 1}}>
        <TextField label="Напишите тег" variant="outlined" value={input} onChange={e => setInput(e.target.value)} sx={{ flex: 1 }} />
        <Button variant="contained" onClick={() => {
        if (input.trim() !== '' && !tags.map(e => e.tag).includes(input)) {
          setValue('tags', [...tags, {tag: input.trim()}]);
          setInput('')
        }
        }}>Добавить</Button>
      </Box>
      {tags.length > 0 && <Box sx={{padding: "3px", gap: "4px", display: "flex", flexWrap: "wrap", backgroundColor:"background.third"}}>
        {tags.map(e => <Chip 
          key={e.tag} 
          label={e.tag} 
          variant="outlined" 
          color="warning"
          onDelete={() => setValue('tags', tags.filter(tag => tag.tag !== e.tag))} />)}
      </Box>}
    </FormControl>
}

export default TagsRow