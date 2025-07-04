export function toFormData(files: FileList): FormData {
  const formData = new FormData()
  if (files) {
    for (const file of files) {
      formData.append('files', file)
    }
  }
  console.log(formData)
  return formData
}

export function fileToFileList(file: File): FileList {
  const dt = new DataTransfer()
  dt.items.add(file)
  return dt.files
}