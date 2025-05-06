import StoreTags from "@/shared/stores/Store-Tags"
import { observer } from "mobx-react-lite"

function Tags() {
  return StoreTags.tags?.map(e => <ol key={e.id}><input type="checkbox" />{e.tag}</ol>)
}

export default observer(Tags)