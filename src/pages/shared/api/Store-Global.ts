import { makeAutoObservable, runInAction } from "mobx";

export function SendEvent(text: string) {
  
}

class StoreGlobal {
  data: {id: number, text: string, color: string, visible: boolean}[] = []
  
  constructor () {
    makeAutoObservable(this)
  }

  sendInfo(text: string, color: string = 'blue') {
    const id = Math.round(Math.random() * 100) + Date.now()
    this.data.push({id, text, color, visible: false})
    setTimeout(() => runInAction(() => this.data.find(e => e.id == id)!.visible = true), 10)
    setTimeout(() => runInAction(() => this.data.find(e => e.id == id)!.visible = false), 3000)
    setTimeout(() => runInAction(() => this.data = this.data.filter(e => e.visible)), 10000)
    // setTimeout(() => this.data.shift(), 3300)
  }
}

export default new StoreGlobal