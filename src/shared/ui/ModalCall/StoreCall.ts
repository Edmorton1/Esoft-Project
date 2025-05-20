import StoreBaseModal from "@/shared/ui/StoreBaseModal"
import { action, makeObservable, observable } from "mobx";

class StoreCall extends StoreBaseModal {
  name = '';

  constructor() {
    super();
    // makeObservable(this, {
    //   skuf: observable
    // })
  }

  openModal(name: string) {
    this.isOpen = true;
    this.name = name;
    console.log("THIS", this.isOpen)
  };
}

export default new StoreCall