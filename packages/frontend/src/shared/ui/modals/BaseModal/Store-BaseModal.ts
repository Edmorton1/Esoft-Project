import { action, makeObservable, observable } from "mobx"

abstract class StoreBaseModal {
  constructor() {
    makeObservable(this, {
      isOpen: observable,
      openModal: action,
      closeModal: action,
      mount: observable,
      openMount: action,
      closeMount: action
    })
  }
  isOpen: boolean = false;
  mount: boolean = false;

  openModal = () => {
    this.isOpen = true;
  };

  closeModal = () => {
    this.isOpen = false;
  };

  openMount = () => {
    this.mount = true;
  };

  closeMount = () => {
    this.mount = false;
  };
}

export default StoreBaseModal

// import { action, makeObservable, observable } from "mobx"

// abstract class StoreBaseModal {
//   constructor() {
//     makeObservable(this, {
//       isOpen: observable,
//       openModal: action,
//       closeModal: action
//     })
//   }
//   isOpen = false;

//   openModal(...args: any[]) {
//     this.isOpen = true;
//   };

//   closeModal(...args: any[]) {
//     this.isOpen = false;
//   };
// }

// export default StoreBaseModal