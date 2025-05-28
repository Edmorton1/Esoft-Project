import StoreBaseModal from "@/shared/ui/Store-BaseModal"
import { Form } from "@t/gen/Users";

class StoreCall extends StoreBaseModal {
  anotherForm: Form | null = null;

  constructor() {
    super();
    // makeObservable(this, {
    //   skuf: observable
    // })
  }

  // openModal() {
  //   this.isOpen = true;
  //   console.log("THIS", this.isOpen)
  // };
}

export default new StoreCall