import useGeolocation from "@/hooks/useGeolocation";
import { toCl } from "@s/infrastructure/db/Mappers";
import axios from "axios";
import { useEffect } from "react";

function Test() {
  const location = useGeolocation()
  console.log(location?.city)

  return (
    <div>sdsdsd</div>
  )
}

export default Test