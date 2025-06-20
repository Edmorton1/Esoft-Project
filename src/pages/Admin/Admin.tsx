import { Admin, DataProvider, Resource } from "react-admin"
import UserList from "@/pages/Admin/components/UserList"
import { URL_SERVER } from "@shared/URLS"
import { PREFIX } from "@shared/CONST"

const provider: DataProvider = {
  getList: async (resource, params) => {
    const response = await fetch(`${URL_SERVER}${PREFIX}/${resource}`)
    const data = await response.json()
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
  return (
    <Admin basename="/admin" dataProvider={provider}>
      <Resource name="users" list={UserList} />
    </Admin>
  )
}
export default AdminPanel
