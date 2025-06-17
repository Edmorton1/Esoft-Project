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
import MapWidget from "@/shared/widgets/MapWidget/MapWidget"
import TagsRow from "@/pages/Settings/widgets/components/TagsRow"
import Box from "@mui/material/Box"
import DescriptionRow from "@/pages/Settings/widgets/components/DescriptionRow"
import StorePassword from "@/pages/Settings/widgets/store/Store-Password"
import SharedRequests from "@shared/Shared-Requests"
import AvatarRow from "@/pages/Settings/widgets/components/AvatarRow"

export type LocationCallback = (data: number[]) => void

function ProfileSettings() {
  const methods = useForm({resolver: zodResolver(ProfileSchema), defaultValues: {
    sex: StoreForm.form?.sex, 
    target: StoreForm.form?.target, 
    tags: StoreForm.form?.tags ?? [], 
    location: StoreForm.form?.location,
    age: StoreForm.form?.age,
    city: StoreForm.form?.city,
    description: StoreForm.form?.description,
    name: StoreForm.form?.name
  }})
  // ОТСАЛОСЬ tags avatar
  // ЗАВТРА УЛУЧШИТЬ ОТОБРАЖЕНИЕ КАРТЫ, ЗАБЛОКИРОВАТЬ СМЕНУ ГОРОДА, ДОДЕЛАТЬ ИТОГ ФОРМЫ, ДОБАВИТЬ СМЕНУ АВАТАРА, УЛУЧШИТЬ ОПТИМИЗАЦИЮ
  // ЗАВТРА УЛУЧШИТЬ ОПТИМИЗАЦИЮ

  const submit = (data: any) => {
    console.log(data)
    StorePassword.updateForm(StoreUser.user!.id, data)
  }

  const handleLocation = async (data: Parameters<LocationCallback>[0]) => {
    console.log(data)
    const location = await SharedRequests.cityByCoords(data)
    
    console.log("LOCA", location)

    methods.setValue('location', {lng: data[0], lat: data[1]})
    methods.setValue('city', location.city)
  }

  const p = 1.5
  const sx = {bgcolor: "background.alt", p: 2}

  return <FormProvider {...methods}>
    <Paper component={"form"} className={style.container__form} onSubmit={methods.handleSubmit(data => submit(data))}>
      {/* <button onClick={() => console.log(methods.formState.errors)}>Errors</button> */}
      <AvatarRow sx={sx} />
      <Box bgcolor={"background.alt"} component={"div"} className={style['container__form--options']}>
        <Paper sx={{p: p}}>
          <EditRow label="Имя" name="name" />
          <EditRow label="Возраст" name="age" />
          <EditRow label="Город" name="city" disabled={typeof StoreForm.form?.location !== "undefined"} />
          {/* <EditRow label="Описание" value={StoreForm.form?.description} name="description" /> */}
          <DescriptionRow />
        </Paper>
        <Paper sx={{p: p}}>
          <SexRow />
          <TargetRow />
          <TagsRow />
        </Paper>
      </Box>

      <MapWidget height="500px" width="100%" callback={handleLocation} />

      <Button type="submit" variant="contained">Сохранить профиль</Button>
    </Paper>
  </FormProvider>

}

export default ProfileSettings