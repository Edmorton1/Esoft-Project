import { useEffect, useState } from 'react';
import { LocationDTO } from '@t/gen/dtoObjects';
import StoreForm from '@/shared/stores/Store-Form';
import SharedRequests from '@shared/Shared-Requests';



function useGeolocation(callback?: (location: LocationDTO) => void): LocationDTO | null {
  const [city, setCity] = useState<LocationDTO | null>(null);
  
  const SET_DEFAULT = () => {
    let standart;
    console.log("USE LOCATION", StoreForm.form?.location, StoreForm.form?.city)
    if (StoreForm.form?.location && StoreForm.form?.city) {
      standart = {...StoreForm.form.location, city: StoreForm.form.city}
    } else {
      standart = {lng: 37.6175, lat: 55.7520, city: "Москва"}
    }
    setCity(standart)
    console.log({lng: 37.6175, lat: 55.7520, city: "Москва"})
    // callback && callback(standart)
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          // console.log("Геолокация получена:", lat, lng);

          try {
            const parsed = await SharedRequests.cityByCoords([lng, lat])
            setCity(parsed);
            callback && callback(parsed)
            
          } catch (error) {
            console.error("Ошибка при запросе геоданных:", error);
            SET_DEFAULT()
          }
        },
        (error) => {
          console.error("Ошибка при получении геолокации:", error);
          SET_DEFAULT()
        }
      );
    } else {
      console.log("Геолокация не поддерживается этим браузером.");
      SET_DEFAULT()
    }
  }, []);

  return city;
}

export default useGeolocation