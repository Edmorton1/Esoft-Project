import Tag from "@/pages/Users/widgets/Filters/modules/components/Tags/Tag"
import useUpdateParams from "@/shared/hooks/useChangeParams"
import StoreTags from "@/shared/stores/Store-Tags"
import { observer } from "mobx-react-lite"
import { ChangeEvent, FormEvent, useRef, useState } from "react"

function Tags() {
  const tagRef = useRef<HTMLInputElement | null>(null)

  const userTags = StoreTags.tags?.map(
    e => <Tag key={e} tag={e} />
  )

  // const handleClick = () => userTags!.push(<ol><input type="checkbox" id={tagRef.current?.value} /><label htmlFor={tagRef.current?.value}>{tagRef.current?.value}</label></ol>)
  const handleClick = () => !StoreTags.tags?.includes(tagRef.current!.value) ? StoreTags.addTags(tagRef.current!.value!) : ''

  return <>
    {userTags}
    <input ref={tagRef} type="text" />
    <button onClick={handleClick}>Добавить</button>
  </>
}

export default observer(Tags)