import { FormSchema } from "@app/types/gen/Users";
import { z } from "zod";

export const FormWithCursorSchema = FormSchema.extend({
  cursor: z.number()
})

export type FormWithCursor = z.infer<typeof FormWithCursorSchema>