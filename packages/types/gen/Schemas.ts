import { FormSchema, MessageSchema } from "@app/types/gen/Users";
import { z } from "zod";

export const MessageFormSchema = z.object({
  message: MessageSchema,
  form: FormSchema
})

export const zstrnum = z.coerce.number()

const nullToArr = <T extends z.ZodTypeAny>(schema: T) => z.preprocess(val => {
  if (val === null) {
    return []
  } return val
}, z.array(schema))

// export const MessageStackSchema = z.object({
//   sent: nullToArr(MessageSchema),
//   received: nullToArr(MessageSchema)
// })

// export const MessageStackSchema = MessageSchema.extend({
//   isauthor: z.boolean()
// })

// export const MessageStackSchemaArr = z.array(MessageStackSchema)

// export type MessageStackInterface = z.infer<typeof MessageStackSchema>
export type MessageFormType = z.infer<typeof MessageFormSchema>
// export type MessageStackInterfaceArr = z.infer<typeof MessageStackSchemaArr>
