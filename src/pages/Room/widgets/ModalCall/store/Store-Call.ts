import StoreBaseModal from "@/shared/ui/Store-BaseModal"
import { Form } from "@t/gen/Users";
import { action, makeObservable, observable } from "mobx";

class StoreCall extends StoreBaseModal {
  anotherForm: Form | null = null;

  constructor() {
    super();
    makeObservable(this, {
      anotherForm: observable,
      clean: action
    })
  }

  // openModal() {
  //   this.isOpen = true;
  //   console.log("THIS", this.isOpen)
  // };
  clean = () => {
    this.anotherForm = null;
    this.isOpen = false
    this.closeMount()
  }
}

export default new StoreCall