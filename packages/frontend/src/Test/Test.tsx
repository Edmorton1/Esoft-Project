// const testNotArrow = new class TestNotArrow {
//   val = 120

import { useEffect, useState } from "react"

//   arrow = () => console.log(this.val)

//   notArrow() {console.log(this.val)}
// }

function Test() {
//   const arrWrap = testNotArrow.arrow
//   const arr = () => arrWrap()
//   const arrNoWrap = testNotArrow.notArrow.bind(testNotArrow)
//   const notarr = () => arrNoWrap()
{/* <button onClick={function() {arr()}}>arrow</button> */}
    // <button onClick={notarr}>not arrow</button>
  const [state, setState] = useState<string[]>([])
  
  const channel = new BroadcastChannel("state_channel")

  useEffect(() => {
    channel.onmessage = (event) => {
      setState(event.data)
    }
    return () => channel.close()
  }, [])

  const updateState = (newState: string[]) => {
    setState(newState)
    channel.postMessage(newState)
  }

  return <>
    <button onClick={() => updateState([...state, "new"])}>add</button>
    {state}
  </>
}

export default Test