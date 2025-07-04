import { Form, LocationType } from "@app/types/gen/Users";
import { BooleanField, Datagrid, DateField, DeleteButton, EditButton, FunctionField, ImageField, List, SelectField, TextField } from "react-admin";

function FormList(props: any) {
	return <List {...props}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="name" />
			<TextField source="sex" />
			<BooleanField source="age" />
      <ImageField source="avatar" />
      <TextField source="description" />
      <SelectField source="target" />
      <TextField source="city" />
      <FunctionField label="location" render={(record: Form) => `${record.location?.lat}, ${record.location?.lat}`} />
      <DateField source="last_active" />
			<EditButton />
			<DeleteButton />
		</Datagrid>
	</List>
}

export default FormList