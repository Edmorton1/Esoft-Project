import storeAuthorization from "@/store/Store-User";
import StoreForm from "@/store/Store-Form";
import { Form } from "@s/core/domain/Users";
import { useForm, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { FormDTO, UserDTO } from "@s/core/dtoObjects";

function FormCreate({register}: {register: UseFormRegister<UserDTO & FormDTO>}) {

  return (
    <>
    <div>Создание анкеты</div>
    <br />
    <label>Имя</label>
    <input {...register('name')} type="text" value={"Коля"} />
    <label>Фамилия</label>
    <input {...register('surname')} type="text" value={"Коля"} />
    <label>Пол</label>
    <select {...register('sex', {setValueAs: Boolean})} value={"1"}>
      <option value="true">Мужчина</option>
      <option value="false">Женщина</option>
    </select>
    <label>Возраст</label>
    <input {...register('age', {valueAsNumber: true})} type="number" value={20} />
    <label>Цель</label>
    <input {...register('target')} type="text" value={"Коля"} />
    <label>Район</label>
    <input {...register('hood')} type="text" value={"Коля"} />
    <label>Теги</label>
    <input {...register('tags')} type="text" value={"Рыбалка, качалка, гитарка"} />
    <label>Описание</label>
    <textarea {...register('description')} value={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque illo voluptatibus distinctio inventore officiis quisquam aspernatur fuga voluptatum assumenda dicta similique maxime, quia vel dolore! Soluta error reprehenderit sint voluptatibus?"}></textarea>
    <button>Отправить</button>
    {/* <label>Аватар</label>
      <input {...register('avatar')} type="file" /> */}
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