import UsersWidget from "@app/client/pages/Users/widgets/UsersWidget";
import { observer } from "mobx-react-lite";

function Users() {
  return <UsersWidget/>
}

export default observer(Users)