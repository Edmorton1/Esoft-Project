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

// export const toCapitalize = (val: string) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
export const toCapitalize = (val: string) => val.split(/[\s-]/g).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(val.includes('-') ? '-' : ' ');

export const nullToUndefined = (val: unknown): unknown => {
  if (val === null) return undefined;

  if (Array.isArray(val)) {
    const cleanedArray = val.map(nullToUndefined);
    const allUndefined = cleanedArray.every(item => item === undefined);
    return allUndefined ? undefined : cleanedArray;
  }

  if (typeof val === 'object' && val !== null) {
    const entries = Object.entries(val);
    const cleaned = entries.map(([key, value]) => [key, nullToUndefined(value)]);
    const allUndefined = cleaned.every(([_, v]) => v === undefined);
    return allUndefined ? undefined : Object.fromEntries(cleaned);
  }

  return val;
};

// export const queryToString = z.preprocess(val => {
//   if (typeof val === 'string') {
//     if (val.trim() === '') {
//       return undefined
//     } return val
//   } else if (typeof val === 'number') {
//     return val
//   } return undefined
// }, z.string().trim().optional())

// export const queryToNumber = z.preprocess(val => {
//   const num = Number(val)
//   if (Number.isNaN(num) || val === '') {
//     return undefined
//   } return num
// }, z.number().optional())
export const queryBoolean = z.preprocess(val => {
    if (val === 'true') {
      return true
    } else if (val === 'false') {
      return false
    } return undefined
  }, z.boolean().optional())