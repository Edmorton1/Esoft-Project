import { nullToUndefined, zid, zstring } from "@app/types/shared/zodSnippets";
import { z } from "zod";

export const TargetTypeSchema = z.enum(["friend", "relation", "chat", "hobby"]);
export const UserRoleSchema = z.enum(["user", "admin"]);

const zISOString = z.coerce.date().transform(d => d.toISOString());

export const LocationSchema = z.object({
	lng: z.number(),
	lat: z.number(),
});

export const PasswordZOD = z.string().nonempty().nullable();

export const UserSchema = z.object({
	id: zid,
	email: zstring.email(),
	// ВРЕМЕННАЯ МЕРА, В ПРОДЕ УБРАТЬ
	// password: z.string().nonempty().min(6),
	password: PasswordZOD,
	role: UserRoleSchema,
	google_id: z.preprocess(nullToUndefined, z.string().max(21).optional()),
	created_at: zISOString,
});

export const TagsSchema = z.object({
	id: zid,
	tag: zstring,
});

export const MessageSchema = z.object({
	id: zid,
	fromid: zid,
	toid: zid,
	text: zstring,
	files: z.preprocess(
		nullToUndefined,
		z.array(z.string().nonempty()).optional(),
	),
	created_at: zISOString,
});

export const LikesSchema = z.object({
	id: zid,
	userid: zid,
	liked_userid: zid,
});

// export const DataResSchema = z.object({
//   id: z.number(),
//   userid: z.number(),
//   res_userid: z.number(),
// });

// export const TokenSchema = z.object({
//   id: zid,
//   token: z.string().nonempty(),
// });

export const UserTagsSchema = z.object({
	id: zid,
	tagid: zid,
});

export const FormSchema = z.object({
	id: zid,
	name: zstring,
	sex: z.boolean(),
	age: z.number().positive().min(18).max(122),
	target: TargetTypeSchema,
	// targetCustom: z.string().optional(),
	avatar: z
		.preprocess(nullToUndefined, z.string().nonempty().optional())
		.optional(),
	description: z.preprocess(nullToUndefined, zstring.optional()).optional(),
	city: zstring,
	// location: z.preprocess(nullToUndefiend, z.union([LocationSchema, z.string()]).optional()),
	location: z.preprocess(nullToUndefined, LocationSchema.optional()),
	tags: z.preprocess(nullToUndefined, z.array(TagsSchema).optional()),
	// last_active: z.preprocess(date => JSON.stringify(date), z.string())
	last_active: zISOString,
	distance: z.preprocess(nullToUndefined, z.string().optional()) 
	// likes: z.array(z.number()).optional(),
	// message: z.array(MessageSchema).optional(),
});

export const PostsSchema = z.object({
	id: zid,
	userid: zid,
	text: z.string().trim().nonempty().max(4096),
	files: z.array(z.string()).max(3),
	created_at: zISOString,
});

export type User = z.infer<typeof UserSchema>;
export type Form = z.infer<typeof FormSchema>;
export type UserTags = z.infer<typeof UserTagsSchema>;
// export type Token = z.infer<typeof TokenSchema>;
// export type DataRes = z.infer<typeof DataResSchema>;
export type Likes = z.infer<typeof LikesSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Tags = z.infer<typeof TagsSchema>;
export type TargetType = z.infer<typeof TargetTypeSchema>;
export type UserRoleType = z.infer<typeof UserRoleSchema>;
export type Posts = z.infer<typeof PostsSchema>;

export type LocationType = z.infer<typeof LocationSchema>;
