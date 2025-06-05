import { useEffect, useState } from 'react';
import axios from 'axios';
import { LocationDTO } from '@t/gen/dtoObjects';
import { GISKEY } from '@/envClient';



function useGeolocation(callback?: (location: LocationDTO) => void): LocationDTO | null {
  const [city, setCity] = useState<LocationDTO | null>(null);
  
  const SET_DEFAULT = () => {
    const standart = {lng: 37.6175, lat: 55.7520, city: "Москва"}
    setCity({lng: 37.6175, lat: 55.7520, city: "Москва"})
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
            const { data } = await axios.get(`https://catalog.api.2gis.com/3.0/items/geocode?lat=${lat}&lon=${lng}&fields=items.point&key=${GISKEY}`);
            console.log(data?.result?.items[0]?.full_name?.split(','), lng, lat);
            const parsed = {city: data?.result?.items[0]?.full_name?.split(',')[0], lng, lat}
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