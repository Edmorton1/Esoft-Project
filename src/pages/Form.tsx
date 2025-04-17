import storeAuthorization from "@/store/store-authorization";
import StoreForm from "@/store/Store-Form";
import { Form } from "@s/core/domain/Users";
import { useForm } from "react-hook-form";

interface RawForm {
  name: string,
  surname: string,
  sex: boolean,
  age: number,
  description: string,
  target: string,
  hood: string,
  tags: string
}

function FormCreate() {
    const { register, handleSubmit } = useForm<RawForm>();

  const handleForm = async (data: RawForm) => {
    const newData: Form = {...data, id: storeAuthorization.user.id, tags: data.tags.split(',').map(e => e.toLowerCase().trim()), avatar: null}
    StoreForm.postForm(newData)
  }

  return (
    <>
    <div>Добро пожаловать, {storeAuthorization.user?.email}</div>
    <div>Создание анкеты</div>
    <form onSubmit={handleSubmit((data) => handleForm(data))} style={{display: "flex", flexDirection: "column", width: "400px", gap: "20px"}}>
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
    </form>
    </>
  )
}

export default FormCreate