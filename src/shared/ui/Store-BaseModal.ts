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

  openModal(...args: any[]) {
    this.isOpen = true;
  };

  closeModal(...args: any[]) {
    this.isOpen = false;
  };

  openMount(...args: any[]) {
    this.mount = true;
  };

  closeMount(...args: any[]) {
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