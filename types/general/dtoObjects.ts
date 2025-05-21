import { UserSchema } from "@t/general/Users";
import { z } from 'zod';

export const UserDTOSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const PayloadDTOSchema = z.object({
  id: z.number(),
  role: z.string(),
});

export const JWTDTOSchema = z.object({
  id: z.number(),
  role: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export const TokenDTOSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
});


export const LikesDTOSchema = z.object({
  userid: z.number(),
  liked_userid: z.number(),
});

export const LocationDTOSchema = z.object({
  city: z.string(),
  lng: z.number(),
  lat: z.number(),
});

export const MessageDTOSchema = z.object({
  fromid: z.union([z.number(), z.string()]),
  toid: z.union([z.number(), z.string()]),
  text: z.string(),
  files: z.instanceof(FileList),
});

export const MessagePutDTOSchema = z.object({
  id: z.number(),
  fromid: z.number(),
  toid: z.number(),
  text: z.string(),
  files: z.object({
    new: z.union([z.instanceof(FileList), z.null()]),
    old: z.array(z.string()).nullable(),
  }),
});

export const MessagePutServerSchema = z.object({
  fromid: z.number(),
  toid: z.number(),
  text: z.string(),
  deleted: z.array(z.string()).optional(),
});

export type UserDTO = z.infer<typeof UserDTOSchema>;

export type PayloadDTO = z.infer<typeof PayloadDTOSchema>;
export type JWTDTO = z.infer<typeof JWTDTOSchema>;
export type TokenDTO = z.infer<typeof TokenDTOSchema>;
export type LikesDTO = z.infer<typeof LikesDTOSchema>;
export type LocationDTO = z.infer<typeof LocationDTOSchema>;
export type MessageDTO = z.infer<typeof MessageDTOSchema>;
export type MessagePutDTO = z.infer<typeof MessagePutDTOSchema>;
export type MessagePutServer = z.infer<typeof MessagePutServerSchema>;
