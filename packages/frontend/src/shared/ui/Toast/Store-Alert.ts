import { paths } from "@app/shared/PATHS";
import { makeAutoObservable, runInAction } from "mobx";

type colorType = "warning.main" | "error.main" | "primary.main" | "success.main"


class StoreAlert {
  data: {id: number, text: string, visible: boolean, color: colorType, url: string | undefined}[] = []
  
  constructor () {
    makeAutoObservable(this)
  }

  private addAlert = (text: string, color: colorType, url: string | undefined) => {
    const id = Math.round(Math.random() * 100) + Date.now()
    this.data.push({id, text, color, visible: false, url})
    setTimeout(() => runInAction(() => this.data.find(e => e.id == id)!.visible = true), 10)
    setTimeout(() => runInAction(() => this.data.find(e => e.id == id)!.visible = false), 8000)
    setTimeout(() => runInAction(() => this.data = this.data.filter(e => e.visible)), 10000)
  }

  likeInfo(userid: number, text: string, color: colorType = "primary.main") {
    this.addAlert(text, color, `/${paths.profile}/${userid}`)
  }

  mapError(text: string, color: colorType) {
    // const id = this.getId()
    this.addAlert(text, color, undefined)

  }
}

export default new StoreAlert

// [
//   {
//     id: 1,
//     text: "Успешная операция",
//     visible: true,
//     color: "success.main"
//   },
//   {
//     id: 2,
//     text: "Есть предупреждение",
//     visible: true,
//     color: "warning.main"
//   },
//   {
//     id: 3,
//     text: "Произошла ошибка",
//     visible: true,
//     color: "error.main"
//   }
// ]