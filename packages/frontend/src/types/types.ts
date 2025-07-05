import { UseFormRegister } from "react-hook-form";

export type RegisterNames<T> = T extends UseFormRegister<infer U> ? keyof U : never