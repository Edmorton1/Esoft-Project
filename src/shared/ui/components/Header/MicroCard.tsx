import { MicroCardType } from "@/shared/ui/components/Header/Store-searchForm"

interface propsInterface {
  MicroForm: MicroCardType
}

function MicroCard({MicroForm}: propsInterface) {
  return <article>
    <p>{MicroForm.name}</p>
    <p>{}</p>
  </article>
}

export default MicroCard