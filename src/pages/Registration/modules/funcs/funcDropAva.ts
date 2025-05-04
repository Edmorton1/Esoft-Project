import StoreUser from "@/shared/store/Store-User";
import StoreFiles from "@/shared/store/StoreFiles";

export async function toFormData(files: FileList | null) {
  const formData = new FormData()
  if (files) {
    for (const file of files) {
      formData.append('files', file)
    }
  }
  console.log(formData)
  return formData
}

export async function AvatarHandle(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('avatar', file)
  console.log(formData.get(file.name))

  return await StoreFiles.postAvatar(formData, StoreUser.user!.id)
}

export function AvatarOnChange(event: React.ChangeEvent<HTMLInputElement>) {
  AvatarHandle(event.target.files![0]);
}