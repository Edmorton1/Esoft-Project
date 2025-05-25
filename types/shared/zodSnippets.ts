import { z } from "zod"

export const nonempty = 'Это обязательное поле!'
export const email = 'Некорректный Email'

// export const zid = z.coerce.number().int().positive()
export const zid = z.preprocess(val => {
  if (typeof val === 'string' || typeof val === 'number') return Number(val)
    return val
  }, z.number().int().positive())
export const zstring = z.string().trim().nonempty()
export const filelist = z.custom<FileList>(val => val instanceof FileList)
export const expressMulter = z.custom<Express.Multer.File>(val => {
  return val &&
    typeof val === 'object' &&
    typeof val.originalname === 'string' &&
    typeof val.encoding === 'string'
})

export const checkEmptyString = (val: unknown): val is string => typeof val === 'string' && val.trim() !== ''
export const toCapitalize = (val: string) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
export const nullToUndefiend = (val: unknown) => {
  if (val === null) {
    return undefined
  } else {
    return val
  }
}