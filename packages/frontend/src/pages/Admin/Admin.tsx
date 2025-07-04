import { Admin, DataProvider, Resource } from "react-admin"
import UserList from "@app/client/pages/Admin/components/UserList"
import { URL_SERVER } from "@app/shared/URLS"
import { PREFIX } from "@app/shared/CONST"
import StoreUser from "@app/client/shared/stores/Store-User"
import StoreError from "@app/client/errors/Store-Error"
import $api from "@app/client/shared/api/api"
import FormList from "@app/client/pages/Admin/components/FormList"

// https://192.168.1.125:3000/api/forms?filter=%7B%7D&range=%5B0%2C9%5D&sort=%5B%22id%22%2C%22ASC%22%5D


const provider: DataProvider = {
  getList: async (resource, params) => {
    const {data} = await $api.get(`${URL_SERVER}${PREFIX}/${resource}`)
    return {
      data,
      total: data.length || 0
    }
  },
  getOne: () => Promise.reject("getOne not implemented"),
  getMany: () => Promise.reject("getMany not implemented"),
  getManyReference: () => Promise.reject("getManyReference not implemented"),
  create: () => Promise.reject("create not implemented"),
  update: () => Promise.reject("update not implemented"),
  updateMany: () => Promise.reject("updateMany not implemented"),
  delete: () => Promise.reject("delete not implemented"),
  deleteMany: () => Promise.reject("deleteMany not implemented"),
}

function AdminPanel() {
  if (StoreUser.user?.role !== 'admin') {
    StoreError.FourtyFour()
  }

  return (
    <Admin basename="/admin" dataProvider={provider}>
      <Resource name="users" list={UserList} />
      <Resource name="forms" list={FormList} />
      {/* <Resource name="users" />
      <Resource name="users" />
      <Resource name="users" />
      <Resource name="users" /> */}
    </Admin>
  )
}
export default AdminPanel
