function MessageEdit() {

  function DeletedFiles() {
    return files?.old?.map(e => (
      <div key={e}>
        {e}
        <button onClick={() => setFiles(prev => ({...prev!, old: prev!.old!.filter(file => file != e)}))}>удалить</button>
      </div>
    ))
  }

  return <>
    <input type="text" onChange={e => setValue(e.target.value)} defaultValue={value} />
    <br />
    <div>
      <DeletedFiles />
    </div>
    <br />
    <div>Добавить</div>
    <input onChange={e => {
      setFiles(prev => ({...prev!, new: e.target.files}))
    }} type="file" multiple />
    <button onClick={() => {StoreMessages.put({...msg, text: value, files: files!}); setEditMessage(null)}}>Готово</button>
  </>
}

export default MessageEdit