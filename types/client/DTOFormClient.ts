import {FormDTOCSchemaServer} from "@t/server/DTOFormServer";
import {UserDTOSchema} from "@s/core/dtoObjects";
import {z} from "zod";

// export const RegistrationDTOClientScema = FormDTOCSchemaServer.extend({
//   avatar: z.union([z.instanceof(FileList), z.string()]).optional(),
// });

export const RegistrationDTOClientScema = FormDTOCSchemaServer.merge(UserDTOSchema).extend({
  // email: z.string().email(),
  password: z.string().trim().min(6),
	// id: z.number(),
	name: z.string().min(2),
	// sex: z.boolean(),
	age: z.number().min(18).max(122),
	// target: TargetTypeSchema,
  avatar: z.union([z.instanceof(FileList), z.string()]).optional(),
	// tags: z.array(z.string()).optional(),
	// description: z.string().optional(),
	city: z.string().min(1).optional(),
	location: z.object({
			lng: z.number(),
			lat: z.number(),
		}).optional(),
});

export type FormDTOClient = z.infer<typeof RegistrationDTOClientScema>;
