import { useFormContext, useWatch } from "react-hook-form";
import { ProfileType, tagsParse } from "@/pages/Settings/widgets/schema/Schemas";
import { useState } from "react";
import StoreForm from "@/shared/stores/Store-Form";
import { TagsDTO } from "@t/gen/dtoObjects";
import { TagsChips } from "@/shared/ui/components/MuiComponents";

function TagsRow() {
  const [input, setInput] = useState('')
  const {setValue} = useFormContext<ProfileType>()

  // const tags = watch('tags') || []
  const tags: TagsDTO[] = useWatch({name: 'tags'})
  console.log(tagsParse(StoreForm.form?.tags), tagsParse(tags))

  const uslovie = tagsParse(StoreForm.form?.tags ?? []) === tagsParse(tags)

  const color = uslovie ? undefined : 'warning'
  console.log(tagsParse(StoreForm.form?.tags), tagsParse(tags))
  
  return <TagsChips tags={tags} input={input} setInput={setInput} setValue={setValue} color={color} />
}

export default TagsRow