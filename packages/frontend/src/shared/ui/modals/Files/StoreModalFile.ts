import StoreBaseModal from "@app/client/shared/ui/modals/BaseModal/Store-BaseModal";
import { action, makeObservable, observable } from "mobx";

class StoreModalFile extends StoreBaseModal {
  constructor() {
    super()
    makeObservable(this, {
      file: observable,
      setFile: action
    })
  }

  file: string | null = null;

  setFile = (file: string) => {
    this.file = file
  }
}

export default new StoreModalFile