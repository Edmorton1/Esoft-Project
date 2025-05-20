import useGeolocation from "@/shared/hooks/useGeolocation";

function Test() {
  const location = useGeolocation()
  console.log(location?.city)

  const fetchTest = async () => console.log(await (await fetch('http://localhost:3000/test')).json())

  return (
    <>
      <button onClick={fetchTest}>Тестовый запрос</button>
    </>

  )
}

export default Test