import {FormDTOCSchemaServer} from "@t/server/DTOFormServer";
import {UserDTOSchema} from "@t/general/dtoObjects";
import {z} from "zod";

// export const RegistrationDTOClientScema = FormDTOCSchemaServer.extend({
//   avatar: z.union([z.instanceof(FileList), z.string()]).optional(),
// });

export const RegistrationDTOClientScema = FormDTOCSchemaServer.merge(UserDTOSchema).extend({
  email: z.string().trim().email(),
  password: z.string().trim().min(6),
	// id: z.number(),
	name: z.string().trim().min(2),
	// sex: z.boolean(),
	age: z.number().min(18).max(122),
	// target: TargetTypeSchema,
  avatar: z.union([z.instanceof(FileList), z.string()]).optional(),
	tags: z.array(z.string().trim()).optional(),
	description: z.string().trim().optional(),
	city: z.string().trim().min(1).optional(),
	location: z.object({
			lng: z.number(),
			lat: z.number(),
		}).optional(),
});

export type FormDTOClient = z.infer<typeof RegistrationDTOClientScema>;
