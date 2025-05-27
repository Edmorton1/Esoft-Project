import { action, makeObservable, observable } from "mobx"

abstract class StoreBaseModal {
  constructor() {
    makeObservable(this, {
      isOpen: observable,
      openModal: action,
      closeModal: action
    })
  }
  isOpen = false;

  openModal(...args: any[]) {
    this.isOpen = true;
  };

  closeModal(...args: any[]) {
    this.isOpen = false;
  };
}

export default StoreBaseModal