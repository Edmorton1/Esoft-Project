import { setErrorMap } from "zod";

export const remail = "Некорректный email"
export const passError = "Пароль должен быть длинной минимум 6 символов"

setErrorMap((issue) => {
  const translations: Record<string, string> = {
    invalid_type: "Неверный тип данных",
    invalid_literal: "Значение не соответствует ожидаемому литералу",
    custom: "Неверное значение",
    invalid_union: "Значение не соответствует ни одной из возможных схем",
    invalid_union_discriminator: "Некорректный дискриминатор union-типа",
    invalid_enum_value: "Недопустимое значение перечисления",
    unrecognized_keys: "Обнаружены нераспознанные ключи в объекте",
    invalid_arguments: "Недопустимые аргументы функции",
    invalid_return_type: "Неверный тип возвращаемого значения функции",
    invalid_date: "Недопустимая дата",
    invalid_string: "Неверная строка",
    too_small: "Значение слишком маленькое",
    too_big: "Значение слишком большое",
    invalid_intersection_types: "Ошибка пересечения типов",
    not_multiple_of: "Значение должно быть кратно указанному числу",
    not_finite: "Число должно быть конечным",
    invalid_enum: "Недопустимое значение перечисления",
    invalid_number: "Неверное число",
    invalid_boolean: "Ожидалось булево значение",
    invalid_bigint: "Ожидалось значение типа bigint",
    invalid_symbol: "Ожидался символ",
    invalid_map: "Ожидалась Map",
    invalid_set: "Ожидался Set",
    invalid_function: "Ожидалась функция",
    invalid_lazy_type: "Ошибка ленивой схемы",
    invalid_promise: "Ожидался Promise",
    invalid_discriminator: "Ошибка дискриминатора",
    invalid_na: "Недопустимое значение",
    not_string: "Ожидалась строка",
    not_number: "Ожидалось число",
    not_boolean: "Ожидалось булево значение",
    not_date: "Ожидалась дата",
    not_array: "Ожидался массив",
    not_object: "Ожидался объект",
    not_null: "Ожидалось null",
    not_undefined: "Ожидалось undefined",
  };

  const message = translations[issue.code] || "Неверное значение";
  return { message };
});
