import Checkbox from "@/pages/Users/widgets/Filters/modules/ui/Checkbox"
import Select from "@/pages/Users/widgets/Filters/modules/ui/Select"
import useUpdateParams from "@/shared/hooks/useChangeParams"
import StoreTags from "@/shared/stores/Store-Tags"
import { useState } from "react"
import { useForm } from "react-hook-form"


function UsersFilterWidget() {
  const Tags = () => StoreTags.tags?.map(e => <>
    <ol><input type="checkbox" />{e.tag}</ol>
  </>)

  const UpdateParams = useUpdateParams()

  return <>
  <button onClick={() => UpdateParams.update('asd', 'asdasd')}>params</button>
  <button onClick={() => console.log(UpdateParams.params)}>params</button>
  <button onClick={() => UpdateParams.remove('asd')}>remove</button>
  
    <div>Показывать только</div>
    <br />
    <label htmlFor="sex">Пол</label>
    <ul>
      <Checkbox keyName="sex" value="man">Мужчина</Checkbox>
      <Checkbox keyName="sex" value="woman">Женщина</Checkbox>
    </ul>
    <label htmlFor="age">Возраст</label>
    <input type="range" />
    <label htmlFor="target">Цель</label>
    <Select />
    <label htmlFor="city">Город</label>
    <input type="text" />
    {/* <label htmlFor="location">Расстояние</label>
    <input type="range" /> */}
    <div>
      <label htmlFor="tags">Тэги</label>
      <ul style={{display: "flex", flexDirection: "column"}}>
        <Tags />
      </ul>
    </div>
  </>
}

export default UsersFilterWidget