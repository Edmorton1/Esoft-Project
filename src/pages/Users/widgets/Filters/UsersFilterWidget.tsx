import Checkbox from "@/pages/Users/widgets/Filters/modules/components/Checkbox"
import AgeRange from "@/pages/Users/widgets/Filters/modules/components/AgeRange"
import Select from "@/pages/Users/widgets/Filters/modules/components/Select"
import Tags from "@/pages/Users/widgets/Filters/modules/components/Tags/Tags"
import Input from "@/pages/Users/widgets/Filters/modules/components/Input"


function UsersFilterWidget() {
  console.log("FILTER RE")

  return <>
    <div>Показывать только</div>
    <br />
    <label htmlFor="sex">Пол</label>
    <ul>
      <Checkbox keyName="sex" value="man">Мужчина</Checkbox>
      <Checkbox keyName="sex" value="woman">Женщина</Checkbox>
    </ul>
    <Checkbox keyName="avatar" value="true" >Только с аватарками</Checkbox>
    <label htmlFor="age">Возраст</label>
    <AgeRange keyName="min_age" />
    <AgeRange keyName="max_age"/>
    {/* <Range /> */}
    <label htmlFor="target">Цель</label>
    <Select />
    <label htmlFor="city">Город</label>
    <Input keyName="city" type="text" />
    {/* <label htmlFor="location">Расстояние</label>
    <input type="range" /> */}
    <div>
      <label htmlFor="tags">Тэги</label>
      <ul style={{display: "flex", flexDirection: "column"}}>
        <Tags />
      </ul>
    </div>
    <label htmlFor="max_distance">Максимальное расстояние</label>
    <Input keyName="max_distance" type="number" />
  </>
}

export default UsersFilterWidget