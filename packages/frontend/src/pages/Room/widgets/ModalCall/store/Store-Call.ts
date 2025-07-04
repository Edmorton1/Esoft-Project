import StoreBaseModal from "@app/client/shared/ui/modals/BaseModal/Store-BaseModal"
import { Form } from "@app/types/gen/Users";
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