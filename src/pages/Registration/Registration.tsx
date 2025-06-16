import MapWidget from "@/shared/widgets/MapWidget/MapWidget"
import RegistrationHead from "@/pages/Registration/widgets/RegistrationWidget/RegistrationHead"
import StoreRegistration from "@/pages/Registration/widgets/stores/Store-Registration"
import useGeolocation from "@/shared/hooks/useGeolocation"
import { LocationDTO } from "@t/gen/dtoObjects"

function Registration() {
  
  useGeolocation((data: LocationDTO) => {console.log(data, 'set data'); StoreRegistration.setDefaultCoords(data)})

  return <>
    <RegistrationHead/>
  </>
}

export default Registration