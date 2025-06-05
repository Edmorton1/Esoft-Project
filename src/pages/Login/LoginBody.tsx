import storeAuthorization from "@/shared/stores/Store-User";
import FormError from "@/shared/ui/kit/FormError";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { UserDTO } from "@t/gen/dtoObjects";
import { observer } from "mobx-react-lite";
import { FieldErrors, UseFormRegister } from "react-hook-form";

function LoginBody({onSubmit, register, handleTest, errors}: {onSubmit: () => void, register: UseFormRegister<UserDTO>, handleTest: () => void, errors: FieldErrors<UserDTO>}) {
    const buttonVariant = 'outlined'

  return <>
      <div>vasya@gmail.com</div>
      <div>Добро пожаловать: {storeAuthorization.user?.email}</div>
      <br />
      <form onSubmit={onSubmit}>
      <FormControl error={!!errors.email}>
        <InputLabel htmlFor="email">email</InputLabel>
        <Input {...register('email')} type="text" autoComplete="username" id="email"/>
        <FormError id={"email"} error={errors.email}></FormError>
      </FormControl>
      <FormControl error={!!errors.password}>
        <InputLabel htmlFor="password">password</InputLabel>
        <Input {...register('password')} type="password" autoComplete="new-password" id="password" />
        <FormError id={"password"} error={errors.password}></FormError>
      </FormControl>
        {/* <input {...register('email')} type="text" placeholder="email" />
        <input {...register('password')} type="text" placeholder="password" value="123" /> */}
        <button>Войти</button>
      </form>
      <Box display="flex" flexDirection="column">
        <button onClick={() => console.log(errors)}>Errors</button>
        <Button onClick={storeAuthorization.logout} variant={buttonVariant}>Выйти</Button>
        <Button onClick={() => console.log(storeAuthorization.user)} variant={buttonVariant}>Вывести пользователя</Button>
        <Button onClick={handleTest} variant={buttonVariant}>Запрос на проверку авторизации</Button>
        <Button onClick={storeAuthorization.initial} variant={buttonVariant}>Инициализация</Button>
      </Box>
    </>
}

export default observer(LoginBody)