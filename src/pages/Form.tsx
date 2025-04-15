import storeAuthorization from "@/store/store-authorization";
import StoreForm from "@/store/store-form";
import { Form } from "@s/core/domain/Users";
import { useForm } from "react-hook-form";


interface RawForm {
  name: string,
  surname: string,
  sex: string,
  age: string,
  description: string,
  target: string,
  hood: string,
  tags: string
}

function FormCreate() {
    const { register, handleSubmit } = useForm<RawForm>();

  function convertFormData(raw: RawForm): Form {
    return {
      ...raw,
      id: storeAuthorization.user.id,
      age: Number(raw.age),
      tags: raw.tags.split(',').map(e => e.toLowerCase().trim()),
      avatar: null,
      sex: Boolean(raw.sex)
    }
  }

  const handleForm = async (data: Form) => {
    StoreForm.postForm(data)
  }

  return (
    <>
    <div>Добро пожаловать, {storeAuthorization.user?.email}</div>
    <div>Создание анкеты</div>
    <form onSubmit={handleSubmit((data) => handleForm(convertFormData(data)))} style={{display: "flex", flexDirection: "column", width: "400px", gap: "20px"}}>
      <label>Имя</label>
      <input {...register('name')} type="text" value={"Коля"} />
      <label>Фамилия</label>
      <input {...register('surname')} type="text" value={"Коля"} />
      <label>Пол</label>
      <select {...register('sex')} value={"1"}>
        <option value="true">Мужчина</option>
        <option value="false">Женщина</option>
      </select>
      <label>Возраст</label>
      <input {...register('age')} type="number" value={20} />
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
    </form>
    </>
  )
}

export default FormCreate