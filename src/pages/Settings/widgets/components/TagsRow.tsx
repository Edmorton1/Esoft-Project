import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useFormContext } from "react-hook-form";
import { ProfileType, tagsParse } from "@/pages/Settings/widgets/schema/Schemas";
import { useState } from "react";
import StoreForm from "@/shared/stores/Store-Form";
import { Tags } from "@t/gen/Users";

function TagsRow() {
  const [input, setInput] = useState('')
  const {setValue, watch} = useFormContext<ProfileType>()

  const tags = watch('tags') || []
  console.log(tagsParse(StoreForm.form?.tags), tagsParse(tags))

  const uslovie = tagsParse(StoreForm.form?.tags ?? []) === tagsParse(tags)

  const color = uslovie ? 'default' : 'warning'
  console.log(tagsParse(StoreForm.form?.tags), tagsParse(tags))
  const colorPrimary = uslovie ? 'primary' : 'warning'
  
  return <FormControl fullWidth>
    <FormLabel>Тэги</FormLabel>
      <Box sx={{display: "flex", gap: 1}}>
        <TextField color={colorPrimary} label="Напишите тег" variant="outlined" value={input} onChange={e => setInput(e.target.value)} sx={{ flex: 1 }} />
        <Button color={colorPrimary} variant="contained" onClick={() => {
        if (input.trim() !== '' && !tags.map(e => e.tag).includes(input)) {
          setValue('tags', [...tags, {tag: input.trim()}]);
          setInput('')
        }
        }}>Добавить</Button>
      </Box>
      {tags.length > 0 && <Box sx={{padding: "3px", gap: "4px", display: "flex", flexWrap: "wrap", backgroundColor:"background.paper"}}>
        {tags.map(e => <Chip 
          key={e.tag} 
          label={e.tag} 
          variant="outlined" 
          color={color}
          onDelete={() => setValue('tags', tags.filter(tag => tag.tag !== e.tag))} />)}
      </Box>}
    </FormControl>
}

export default TagsRow