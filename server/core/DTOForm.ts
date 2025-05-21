import { TargetTypeSchema } from "@s/core/domain/Users";
import { MulterFileSchema } from "@s/core/sharedTypes";
import z from "zod"

export const FormDTOCSchemaServer = z.object({
  id: z.number(),
  name: z.string(),
  sex: z.boolean(),
  age: z.number(),
  target: TargetTypeSchema,
  // targetCustom: z.string().optional(), // если раскомментируешь
  avatar: MulterFileSchema.optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
  city: z.string().optional(),
  location: z.object({
    lng: z.number(),
    lat: z.number(),
  }).optional(),
})


export type FormDTOServer = z.infer<typeof FormDTOCSchemaServer>