import StoreUser from "@/store/Store-User";
import StoreFiles from "@/store/StoreFiles";

function dropHandle(file: File) {
  const formData = new FormData();
  formData.append('avatar', file)
  console.log(formData.get(file.name))

  StoreFiles.postAvatar(formData, StoreUser.user!.id)
}
export function dropAvatar(event: React.ChangeEvent<HTMLInputElement>) {
  dropHandle(event.target.files![0]);
}