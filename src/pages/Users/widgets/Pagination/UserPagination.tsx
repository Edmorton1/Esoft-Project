import useUpdateParams from "@/shared/hooks/useChangeParams"
import { useState } from "react"

function Pagination() {
  const [show, setShow] = useState(false)
  const key = "page"
  const [params, updateParams] = useUpdateParams()
  
  const page = Number(params.page) || 1

  const handleClick = (page: number) => {updateParams(key, page); setShow(false)}
  
  const Pagination = () => {
    const pages = 21
    const elements = []

    for (let i = 0; i < pages; i++) {
      const but = i + 1
      if (but == 1 || but == pages || but == page || (4 > page - but && page - but > 0) || (4 > but- page && but - page > 0)) {
        elements.push(
          <button onClick={() => handleClick(but)} style={but === page ? {backgroundColor: "red"} : {}} key={but}>{i + 1}</button>
        )
      }
      if (i == pages - 2 && show) {
        elements.push(
          <input type="number" key={but}/>
        )
      }
      if (i == pages - 2) {
        elements.push(
          <button onClick={() => setShow(true)} key={but}>...</button>
        )
      }
    }
    return elements
  }
  
  return <Pagination />
}

export default Pagination
