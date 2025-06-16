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

export type LocationCallback = (data: number[]) => void

function ProfileSettings() {
  const methods = useForm({resolver: zodResolver(ProfileSchema), defaultValues: {
    sex: StoreForm.form?.sex, 
    target: StoreForm.form?.target, 
    tags: StoreForm.form?.tags, 
    location: StoreForm.form?.location,
    age: StoreForm.form?.age,
    city: StoreForm.form?.city,
    description: StoreForm.form?.description,
    name: StoreForm.form?.name
  }})
  // ОТСАЛОСЬ tags avatar
  const submit = (data: any) => {
    console.log(data)
  }

  const handleLocation = (data: Parameters<LocationCallback>[0]) => {
    console.log(data)
    methods.setValue('location', {lng: data[0], lat: data[1]})
  }
  const p = 1.5
  const sx = {bgcolor: "background.alt", p: 2}

  return <FormProvider {...methods}>
    <Paper component={"form"} className={style.container__form} onSubmit={methods.handleSubmit(data => submit(data))}>
      {/* <button onClick={() => console.log(methods.formState.errors)}>Errors</button> */}
      <Box sx={sx} component={"div"} className={style['container__form--avatar']}>
        <img src={StoreForm.form?.avatar} alt="" />
        <Button variant="contained">Загрузить аватар</Button>
      </Box>
      <Box sx={sx} component={"div"} className={style['container__form--options']}>
        <Paper sx={{p: p}}>
          <EditRow label="Имя" value={StoreForm.form?.name} name="name" />
          <EditRow label="Возраст" value={StoreForm.form?.age} name="age" />
          <EditRow label="Город" value={StoreForm.form?.city} name="city" />
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