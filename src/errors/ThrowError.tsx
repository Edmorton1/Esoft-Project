import StoreError from "@/errors/Store-Error";
import { observer } from "mobx-react-lite";

function ThrowError() {
  if (StoreError.error) {
    throw StoreError.error
  }

  return <></>
}

export default observer(ThrowError)