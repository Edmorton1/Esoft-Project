import UsersCardInfo from "@/pages/Users/widgets/UsersCard/modules/components/UsersCardInfo"

function UsersCardModule() {
  return <>
    <UsersCardInfo/>
    
    {/* {!StoreLikes.likes?.sent.map(e => e.liked_userid).includes(anUser.id)
    ? !(anUser.id === StoreForm.form?.id) && <button onClick={() => StoreLikes.sendLike({userid: StoreForm.form!.id, liked_userid: anUser.id})}>Лайкнуть</button>
    : StoreForm?.form && <button onClick={() => StoreLikes.delete(anUser.id)}>Убрать лайк</button>} */}
  </>
}

export default UsersCardModule