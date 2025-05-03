import { Message } from "@s/core/domain/Users"

export type MessageContextType = {
  value: string
  // setValue: React.Dispatch<React.SetStateAction<string>>

  files: { new: FileList | null; old: string[] | null } | null
  // setFiles: React.Dispatch<React.SetStateAction<{ new: FileList | null; old: string[] | null } | null>>,
  
  clickDeleteFile: (item: string) => any,
  inputNewFile: (e: React.ChangeEvent<HTMLInputElement>) => any,
  textInput: (e: React.ChangeEvent<HTMLInputElement>) => any,
  submitClick: () => any
}