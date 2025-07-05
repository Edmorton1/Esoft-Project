import { Datagrid, DateField, DeleteButton, EditButton, List, TextField } from "react-admin";

function UserList(props: any) {
  return <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="email" />
      <TextField source="role" />
      <DateField source="created_at" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
}

export default UserList