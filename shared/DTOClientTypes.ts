import { FormDTOCSchemaServer } from "@s/core/DTOForm";
import z from "zod"

export const FormDTOSchemaClient = FormDTOCSchemaServer.extend({
  avatar: z.union([z.instanceof(FileList), z.string()]).optional(),
});

export type FormDTOClient = z.infer<typeof FormDTOSchemaClient>;