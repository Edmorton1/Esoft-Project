import { GISKEY } from "@/envClient"
import $api from "@/shared/api/api"
import StoreAlert from "@/shared/ui/Toast/Store-Alert"
import { serverPaths } from "@shared/PATHS"
import { LocationDTO } from "@t/gen/dtoObjects"
import axios from "axios"
import { makeAutoObservable } from "mobx"

class StoreRegistration {
  defaultCoords: null | LocationDTO = null;
  coords: null | LocationDTO = null

  constructor() {
    makeAutoObservable(this)
  }

  setDefaultCoords = (coords: LocationDTO) => {
    this.defaultCoords = coords
  }

  setCoords = (coords: number[]) => {
    const [lng, lat] = coords
    console.log("ДЕФОЛТ КООРДС", this.defaultCoords)

      axios.get(`https://catalog.api.2gis.com/3.0/items/geocode?lat=${lat}&lon=${lng}&fields=items.point&key=${GISKEY}`)
        .then(data => {
          const places = data.data.result.items
          if (places.length) {
            console.log(places[0].full_name.split(',')[0].trim())
            this.coords = {city: places[0].full_name.split(',')[0].trim(), lng, lat}
            return;
          }
          console.log(places[0].full_name)
          this.coords = {city: "asasdasdas", lng, lat}
        })
        
        // ЗДЕСЬ НАДО УСТАНОВИТЬ КООРДИНАТЫ И СБРОСИТЬ ГОРОД
        .catch(err => {
          console.log("ERROR")
          StoreAlert.mapError("Нельзя поставить координаты здесь", "error.main")
        });
    // axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`).then(data => {
  }

  async emailIsFree(email: string) {
    const {data} = await $api.get(`${serverPaths.checkEmail}/${email}`)
    return data
  }
}

export default new StoreRegistration
