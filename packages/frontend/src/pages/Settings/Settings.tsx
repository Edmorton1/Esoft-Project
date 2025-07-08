import SettingsWidget from "@app/client/pages/Settings/widgets/SettingsWidget"
import StoreUser from "@app/client/shared/stores/Store-User"
import EmptyText from "@app/client/shared/ui/mui_components/EmptyText"
import { observer } from "mobx-react-lite"

function Settings() {

  if (!StoreUser.user) {
    return <EmptyText infoType="no-authorize" />
  }

  return <SettingsWidget />
}

export default observer(Settings)