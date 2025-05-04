import useGeolocation from "@/shared/hooks/useGeolocation";

function Test() {
  const location = useGeolocation()
  console.log(location?.city)

  return (
    <>
      asdasd
    </>

  )
}

export default Test