import useUpdateParams from "@app/client/shared/hooks/useChangeParams"
import StoreForm from "@app/client/shared/stores/Store-Form"
import { useEffect } from "react"

function Tag({tag}: {tag: string}) {
  const [params, updateParams] = useUpdateParams()

  useEffect(() => {
    if (!StoreForm.form?.tags?.map(e => e.tag).includes(tag)) {
      updateParams('tags', tag, false, true, true)
    }
  }, [])

  const handleChange = () => updateParams('tags', tag, false, true)

  return <ol key={tag}>
    <input onChange={handleChange} type="checkbox" id={tag} checked={params?.tags?.includes(tag) ?? false} />
    <label htmlFor={tag}>{tag}</label>
  </ol>
}

export default Tag