import { PostsDTOServer } from "@app/server/types/DTOServer"
import { FormDTO, LikesDTO, MessageDTO, TagsDTO, UserDTO, UserTagsDTO } from "@app/types/gen/dtoObjects"

export type TablesPost = {
  users: UserDTO,
  forms: FormDTO,
  likes: LikesDTO,
  messages: MessageDTO,
  tags: TagsDTO,
  user_tags: UserTagsDTO,
  posts: PostsDTOServer
}