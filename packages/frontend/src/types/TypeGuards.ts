import PeerCaller from "@app/client/pages/Room/WebRTC/logic/PeerCaller";
import PeerResponder from "@app/client/pages/Room/WebRTC/logic/PeerResponder";

export function assertPeerCaller(value: PeerCaller | PeerResponder): asserts value is PeerCaller {
  if (!(value instanceof PeerCaller)) throw new Error("Это не PeerCaller!")
}

// export function assertForm(form: any): asserts form is Form {
//   if (FormSchema.parse(form)) throw new Error("Это не Form!")
// }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // const asd = (await axios.get('https://jsonplaceholder.typicode.com/todos/1')).data
  //     const asd = (await axios.get('https://192.168.1.125:3000/users/1')).data[0]
  //     console.log(asd)
  //     assertUser(asd)
  //     console.log(asd)
  //   }

  //   fetchData()
  // }, [])
