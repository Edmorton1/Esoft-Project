import { FieldErrors, UseFormRegister } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormError from "@/shared/ui/kit/FormError";
import StoreUser from "@/shared/stores/Store-User";
import StoreForm from "@/shared/stores/Store-Form";
import { RegistrationDTOClient } from "@/pages/Registration/widgets/RegistrationWidget/modules/types/RegistrationZOD";

function RegistrationBody({register, onSubmit, errors}: {register: UseFormRegister<RegistrationDTOClient>, onSubmit: (...args: any[]) => any, errors: FieldErrors<RegistrationDTOClient>}) {

  return <>
  <div>Добро пожаловать: {StoreUser.user?.email}</div>
  <button onClick={() => console.log(errors)}>errors</button>
  <form onSubmit={onSubmit} style={{display: "flex", flexDirection: "column", width: "400px", gap: "10px"}}>

    <FormControl error={!!errors.email}>
      <InputLabel htmlFor="email">email</InputLabel>
      <Input {...register('email')} type="text" autoComplete="username" id="email"/>
      <FormError id={"email"} error={errors.email}></FormError>
    </FormControl>
          
    <FormControl>
      <InputLabel htmlFor="password">password</InputLabel>
      <Input {...register('password')} type="password" autoComplete="new-password" id="password" />
      <FormHelperText id="password">Пароль должен...</FormHelperText>
    </FormControl>

    <FormControl>
      <InputLabel htmlFor="confirmPassword">Повторите пароль</InputLabel>
      <Input {...register('confirmPassword')} type="password" autoComplete="new-password" id="confirmPassword" />
      <FormHelperText id="confirmPassword">Пароль должен...</FormHelperText>
    </FormControl>

    <button onClick={StoreUser.logout}>Выйти</button>
    <button onClick={() => console.log(StoreUser.user)}>Вывести пользователя</button>
    <button onClick={() => console.log(StoreForm.form)}>Вывести форму</button>
    <div>Создание анкеты</div>
    <br />
    <label htmlFor="name">Имя</label>
    <input {...register('name')} type="text" id="name" />
    <label htmlFor="sex">Пол</label>
    <select {...register('sex')} id="sex" >
      <option value="true">Мужчина</option>
      <option value="false">Женщина</option>
    </select>
    <label htmlFor="age">Возраст</label>
    <input {...register('age', {valueAsNumber: true})} type="number" id="age" />
    <label htmlFor="target">Цель</label>
    {/* <select {...register('target')} onChange={(e) => {e.target.value == 'other' ? setTarget(true) : setTarget(false)}} id="target"> */}
    <select {...register('target')} id="target">
      <option value="relation">Отношения</option>
      <option value="friend">Дружба</option>
      <option value="chat">Чатинг</option>
      <option value="hobby">Хобби</option>
      {/* <option value="other">Другое</option> */}
    </select>
    {/* {target && <input {...register('targetCustom')} type="text" placeholder="Напишите свою цель..." />} */}
    <label htmlFor="tags">Теги</label>
    <input {...register('tags')} type="text" id="tags" />
    <label htmlFor="description">Описание</label>
    <textarea {...register('description')} id="description" />
    <label htmlFor="avatar">Аватар</label>
    <input {...register('avatar')} type="file" id="avatar" />
    <label htmlFor="city">Город</label>
    <input {...register('city')} type="text" id="city" />
    <button>Отправить</button>
  </form>
  </>
}

export default RegistrationBody

// import storeAuthorization from "@/store/Store-User";
// import StoreForm from "@/store/Store-Form";
// import { Form } from "@s/core/domain/Users";
// import { useForm, UseFormHandleSubmit } from "react-hook-form";
// import { UserDTO } from "@s/core/dtoObjects";
// import handleAllSubmits, { RawForm } from "@/modules/handleSubmits";

// function FormCreate({handleSubmitRegistration}: {handleSubmitRegistration: UseFormHandleSubmit<UserDTO, UserDTO>}) {
//     const { register, handleSubmit } = useForm<RawForm>();

//   return (
//     <>
//     <div>Добро пожаловать, {storeAuthorization.user?.email}</div>
//     <br />
//     <div>Создание анкеты</div>
//     <br />
//     <form onSubmit={(e) => handleAllSubmits(handleSubmitRegistration, handleSubmit, e)} style={{display: "flex", flexDirection: "column", width: "400px", gap: "10px"}}>
//       <label>Имя</label>
//       <input {...register('name')} type="text" value={"Коля"} />
//       <label>Фамилия</label>
//       <input {...register('surname')} type="text" value={"Коля"} />
//       <label>Пол</label>
//       <select {...register('sex', {setValueAs: Boolean})} value={"1"}>
//         <option value="true">Мужчина</option>
//         <option value="false">Женщина</option>
//       </select>
//       <label>Возраст</label>
//       <input {...register('age', {valueAsNumber: true})} type="number" value={20} />
//       <label>Цель</label>
//       <input {...register('target')} type="text" value={"Коля"} />
//       <label>Район</label>
//       <input {...register('hood')} type="text" value={"Коля"} />
//       <label>Теги</label>
//       <input {...register('tags')} type="text" value={"Рыбалка, качалка, гитарка"} />
//       <label>Описание</label>
//       <textarea {...register('description')} value={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque illo voluptatibus distinctio inventore officiis quisquam aspernatur fuga voluptatum assumenda dicta similique maxime, quia vel dolore! Soluta error reprehenderit sint voluptatibus?"}></textarea>
//       <button>Отправить</button>
//       {/* <label>Аватар</label>
//       <input {...register('avatar')} type="file" /> */}
//     </form>
//     </>
//   )
// }

// export default FormCreate