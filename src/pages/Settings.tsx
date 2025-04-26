function Settings() {
  return (
    <main style={{display: "flex", flexDirection: "column"}}>
      <div>Настройки конфиденциальности</div>
      <label htmlFor="surname">Кто видит вашу фамилию?</label>
      <select name="surname" id="surname">
        <option value="all">Все</option>
        <option value="liked">Понравившиеся пользователи</option>
        <option value="none">Никто</option>
      </select>
      <label htmlFor="surname">Кто видит ваш город?</label>
      <select name="surname" id="surname">
        <option value="">Все</option>
        <option value="">Понравившиеся пользователи</option>
        <option value="">Никто</option>
      </select>
    </main>
  )
}

export default Settings