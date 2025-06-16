import StoreBaseModal from "@/shared/components/BaseModal/Store-BaseModal";
import { action, makeObservable, observable } from "mobx";

class StoreTalking extends StoreBaseModal {
  constructor() {
    super()
    makeObservable(this, {
      timer: observable,
      startTimer: action,
      closeTimer: action,
      clean: action
    })
  }
  timer = false

  startTimer = () => {
    this.timer = true
  }

  closeTimer = () => {
    this.timer = false
  }

  clean = () => {
    this.timer = false
    this.isOpen = false
    this.closeMount()
  }

}

export default new StoreTalking