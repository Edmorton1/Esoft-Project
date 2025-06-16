import EditRow from "@/pages/Settings/widgets/components/EditRow"
import { ProfileSchema } from "@/pages/Settings/widgets/schema/Schemas"
import StoreUser from "@/shared/stores/Store-User"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import { FormProvider, useForm } from "react-hook-form"
import * as style from "@/shared/css/pages/Settings.module.scss"
import Paper from "@mui/material/Paper"
import StoreForm from "@/shared/stores/Store-Form"
import SexRow from "@/pages/Settings/widgets/components/SexRow"
import TargetRow from "@/pages/Settings/widgets/components/TargetRow"
import useMap from "@/shared/hooks/Map/useMap"
import { useRef } from "react"
import MapWrapper from "@/shared/hooks/Map/MapWrapper"
import MapWidget from "@/shared/widgets/MapWidget/MapWidget"
import TagsRow from "@/pages/Settings/widgets/components/TagsRow"

function ProfileSettings() {
  const methods = useForm({resolver: zodResolver(ProfileSchema), defaultValues: {sex: StoreForm.form?.sex, target: StoreForm.form?.target, tags: StoreForm.form?.tags}})
  // ОТСАЛОСЬ tags location avatar
  const submit = (data: any) => {
    console.log(data)
  }
  const mapRef = useRef(null)
  const map = useMap(mapRef, null)

  return <FormProvider {...methods}>
    <Paper component={"form"} className={style.container__form} onSubmit={methods.handleSubmit(data => submit(data))}>
      <EditRow label="Имя" value={StoreForm.form?.name} name="name" />
      <EditRow label="Возраст" value={StoreForm.form?.age} name="age" />
      <EditRow label="Город" value={StoreForm.form?.city} name="city" />
      <EditRow label="Описание" value={StoreForm.form?.description} name="description" />
      <SexRow />
      <TargetRow />
      <TagsRow />
      {/* <EditRow label="Тэги" value={StoreForm.form?.tags} name="tags" /> */}
      <MapWidget height="700px" width="700px" callback={(data) => console.log(data)} />

      <Button type="submit" variant="contained">Сохранить профиль</Button>
    </Paper>
  </FormProvider>

}

export default ProfileSettings