import { makeAutoObservable, runInAction } from "mobx";

export function SendEvent(text: string) {
  
}

type colorType = "warning.main" | "error.main" | "primary.main" | "success.main"

class StoreAlert {
  data: {id: number, text: string, visible: boolean, color: colorType}[] = []
  
  constructor () {
    makeAutoObservable(this)
  }

  sendInfo(text: string, color: colorType = "primary.main") {
    const id = Math.round(Math.random() * 100) + Date.now()
    this.data.push({id, text, color, visible: false})
    setTimeout(() => runInAction(() => this.data.find(e => e.id == id)!.visible = true), 10)
    setTimeout(() => runInAction(() => this.data.find(e => e.id == id)!.visible = false), 3000)
    setTimeout(() => runInAction(() => this.data = this.data.filter(e => e.visible)), 10000)
    // setTimeout(() => this.data.shift(), 3300)
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