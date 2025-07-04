import MapWidget from "@app/client/shared/widgets/MapWidget/MapWidget"
import RegistrationHead from "@app/client/pages/Registration/widgets/RegistrationWidget/RegistrationHead"
import StoreRegistration from "@app/client/pages/Registration/widgets/stores/Store-Registration"
import useGeolocation from "@app/client/shared/hooks/useGeolocation"
import { LocationDTO } from "@app/types/gen/dtoObjects"

function Registration() {
  
  useGeolocation((data: LocationDTO) => {console.log(data, 'set data'); StoreRegistration.setDefaultCoords(data)})

  return <>
    <RegistrationHead/>
  </>
}

export default Registration