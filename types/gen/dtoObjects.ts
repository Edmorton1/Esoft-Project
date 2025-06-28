import { FormSchema, LocationSchema, MessageSchema, PostsSchema, TagsSchema, UserSchema, UserTagsSchema } from "@t/gen/Users";
import { ExpressMulterFileSchema, zid, zstring } from "@t/shared/zodSnippets";
import { z } from 'zod';

export const UserDTOSchema = UserSchema.pick({email: true, password: true})

export const PayloadDTOSchema = UserSchema.pick({id: true, role: true});

export const JWTDTOSchema = UserSchema
  .pick({id: true, role: true,})
  .extend({iat: z.number(), exp: z.number()});

export const TokenReturnDTOSchema = z.object({
  user: UserSchema,
});

export const FormDTOShema = FormSchema.omit({tags: true, last_active: true})

export const LikesDTOSchema = z.object({
  userid: zid,
  liked_userid: z.number(),
});

export const LocationDTOSchema = LocationSchema.extend({
  city: zstring,
});

export const TagsSchemaDTO = TagsSchema.pick({tag: true})

export const UserTagsSchemaDTO = UserTagsSchema.pick({tagid: true})

export const MessageDTOSchema = MessageSchema.omit({created_at: true, id: true})

export const PostsDTOSchema = PostsSchema
  .omit({id: true, created_at: true})
  .extend({
    files: z.array(ExpressMulterFileSchema).max(3)
  })

export type MessageDTO = z.infer<typeof MessageDTOSchema>
export type UserDTO = z.infer<typeof UserDTOSchema>;
export type PayloadDTO = z.infer<typeof PayloadDTOSchema>;
export type JWTDTO = z.infer<typeof JWTDTOSchema>;
export type TokenReturnDTO = z.infer<typeof TokenReturnDTOSchema>;
export type LikesDTO = z.infer<typeof LikesDTOSchema>;
export type LocationDTO = z.infer<typeof LocationDTOSchema>;
export type TagsDTO = z.infer<typeof TagsSchemaDTO>
export type UserTagsDTO = z.infer<typeof UserTagsSchemaDTO>
export type FormDTO = z.infer<typeof FormDTOShema>
export type PostsDTO = z.infer<typeof PostsDTOSchema>