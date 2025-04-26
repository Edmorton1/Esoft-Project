import { UseFormRegister } from "react-hook-form";
import { FormDTO, LocationDTO, UserDTO } from "@s/core/dtoObjects";
import useGeolocation from "@/hooks/useGeolocation";
import { useContext } from "react";
import { ThemeContext } from "@/pages/Registration";

function FormCreate({register, location}: {register: UseFormRegister<UserDTO & FormDTO>, location: LocationDTO}) {
  const asd = useContext(ThemeContext)
  console.log(asd)

  return (
    <>
    <div>Создание анкеты</div>
    <br />
    <label htmlFor="name">Имя</label>
    <input {...register('name')} type="text" id="name" />
    <label htmlFor="surname">Фамилия</label>
    <input {...register('surname')} type="text" id="surname" />
    <label htmlFor="sex">Пол</label>
    <select {...register('sex', {setValueAs: Boolean})} id="sex" >
      <option value="true">Мужчина</option>
      <option value="false">Женщина</option>
    </select>
    <label htmlFor="age">Возраст</label>
    <input {...register('age', {valueAsNumber: true})} type="number" id="age" />
    <label htmlFor="target">Цель</label>
    <input {...register('target')} type="text" id="target" />
    <label htmlFor="tags">Теги</label>
    <input {...register('tags')} type="text" id="tags" />
    <label htmlFor="description">Описание</label>
    <textarea {...register('description')} id="description" />
    {/* <label>Аватар</label>
    <input {...register('avatar')} type="file" /> */}
    <label htmlFor="city">Город</label>
    <input {...register('city')} type="text" id="city" />
    <button>Отправить</button>
    </>
  )
}

export default FormCreate

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