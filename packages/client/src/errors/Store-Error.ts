import { makeAutoObservable } from "mobx"

class StoreError {
  constructor() {
    makeAutoObservable(this)
  }

  error: Error | null = null

  FourtyFour = () => {
    this.error = new Error("Такой страницы нет!")
  }

  resetErrorBoundary = () => {
    this.error = null
  }
}

export default new StoreError