import { ProfileType } from '@app/client/pages/Settings/widgets/schema/Schemas';
import { RadioGroupMui } from '@app/client/shared/ui/mui_module_components/MuiComponents';
import StoreForm from '@app/client/shared/stores/Store-Form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useFormContext, useWatch } from 'react-hook-form';

function SexRow() {
  const {setValue, control} = useFormContext<ProfileType>()
  // const [color, setColor] = useState<colorTypes>('primary')
  
  const sex = useWatch({name: 'sex'})
  const color = StoreForm.form?.sex !== sex ? "warning" : "primary"
  console.log("SEX ROW RERNEDER")

  // useEffect(() => {
  //   console.log(sex, StoreForm.form?.sex !== sex)
  //   setColor(StoreForm.form?.sex !== sex ? "warning" : "primary")
  // }, [sex])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue('sex', e.target.value === 'true')

	return (
		<RadioGroupMui text="Пол" id="sex" control={control} onChange={handleChange} color={color}>
			<FormControlLabel value={true} control={<Radio color={color} />} label="Мужчина" />
			<FormControlLabel value={false} control={<Radio color={color} />} label="Женщина" />
		</RadioGroupMui>
	);
}

export default SexRow;
