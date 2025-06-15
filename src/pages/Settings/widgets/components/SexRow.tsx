import { ProfileType } from '@/pages/Settings/widgets/schema/Schemas';
import { colorTypes, RadioGroupMui } from '@/shared/components/MuiComponents';
import StoreForm from '@/shared/stores/Store-Form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

function SexRow() {
  const {setValue, control, watch} = useFormContext<ProfileType>()
  // const [color, setColor] = useState<colorTypes>('primary')
  
  const sex = watch('sex')
  const color = StoreForm.form?.sex !== sex ? "warning" : "primary"

  // useEffect(() => {
  //   console.log(sex, StoreForm.form?.sex !== sex)
  //   setColor(StoreForm.form?.sex !== sex ? "warning" : "primary")
  // }, [sex])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('sex', e.target.value === 'true')
  }

	return (
		<RadioGroupMui text="Пол" id="sex" control={control} onChange={handleChange} color={color}>
			<FormControlLabel value={true} control={<Radio color={color} />} label="Мужчина" />
			<FormControlLabel value={false} control={<Radio color={color} />} label="Женщина" />
		</RadioGroupMui>
	);
}

export default observer(SexRow);
