import { GISKEY } from "@/envClient"
import $api from "@/shared/api/api"
import { toCl } from "@shared/MAPPERS"
import { serverPaths } from "@shared/PATHS"
import { LocationDTO } from "@t/gen/dtoObjects"
import { User } from "@t/gen/Users"
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
    // axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`).then(data => {
    axios.get(`https://catalog.api.2gis.com/3.0/items/geocode?lat=${lat}&lon=${lng}&fields=items.point&key=${GISKEY}`).then(data => {
      console.log(data.data.result.items[0].full_name.split(','))
      this.coords = {city: data.data?.result?.items[0]?.full_name?.split(',')[0], lng, lat}
    });
  }

  async emailIsFree(email: string) {
    const request = toCl<Pick<User, 'email'>[]>(await $api.get(`${serverPaths.users}?fields=email`)).map(e => e.email)
    return !request.includes(email)
  }
}

export default new StoreRegistration
