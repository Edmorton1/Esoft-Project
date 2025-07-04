import { FormSchema } from "@t/gen/Users";
import { z } from "zod";

export const FormWithCursorSchema = FormSchema.extend({
  cursor: z.number()
})

export type FormWithCursor = z.infer<typeof FormWithCursorSchema>