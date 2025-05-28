import StoreBaseModal from "@/shared/ui/Store-BaseModal";
import { action, makeObservable, observable } from "mobx";

class StoreTalking extends StoreBaseModal {
  constructor() {
    super()
    makeObservable(this, {
      timer: observable,
      startTimer: action,
      closeTimer: action
    })
  }
  timer = false

  startTimer = () => {
    this.timer = true
  }

  closeTimer = () => {
    this.timer = false
  }

}

export default new StoreTalking