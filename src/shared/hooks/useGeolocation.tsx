import { useEffect, useState } from 'react';
import axios from 'axios';
import { LocationDTO } from '@t/gen/dtoObjects';

function useGeolocation(callback?: (location: LocationDTO) => void): LocationDTO | null {
  const [city, setCity] = useState<LocationDTO | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          // console.log("Геолокация получена:", lat, lng);

          try {
            const { data } = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            // console.log(data.address.city);
            const parsed = {city: data.address.city, lng, lat}
            setCity(parsed);
            callback && callback(parsed)
            
          } catch (error) {
            console.error("Ошибка при запросе геоданных:", error);
          }
        },
        (error) => {
          console.error("Ошибка при получении геолокации:", error);
        }
      );
    } else {
      console.log("Геолокация не поддерживается этим браузером.");
    }
  }, []);

  return city;
}

export default useGeolocation