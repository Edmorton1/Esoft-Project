import MapWidget from "@/pages/Registration/widgets/MapWidget/MapWidget"
import RegistrationWidget from "@/pages/Registration/widgets/RegistrationWidget/RegistrationWidget"
import StoreRegistration from "@/pages/Registration/widgets/stores/Store-Registration"
import useGeolocation from "@/shared/hooks/useGeolocation"
import { LocationDTO } from "@t/gen/dtoObjects"

function Registration() {
  
  useGeolocation((data: LocationDTO) => {console.log(data, 'set data'); StoreRegistration.setDefaultCoords(data)})

  return <>
    <RegistrationWidget/>
    <MapWidget />
  </>
}

export default Registration