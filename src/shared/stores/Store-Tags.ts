// import StoreForm from "@/shared/stores/Store-Form"
// import { toArr } from "@shared/MAPPERS"
// import { makeAutoObservable, runInAction } from "mobx"

// class StoreTags {
//   tags: string[] | null = null

//   constructor() {
//     makeAutoObservable(this)
//   }

//   initial = async () => {
//     const searchParams = toArr(new URLSearchParams(window.location.search).get('tags'))

//     console.log(StoreForm.form)
//     const request = StoreForm.form!.tags!
//     console.log(request)
//     StoreForm.addTags(request)

//     const newTags = searchParams ? [...new Set([...request.map(e => e.tag), ...searchParams])] : request?.map(e => e.tag)


//     runInAction(() => this.tags = newTags)
//   }

//   addTags(tag: string) {
//     this.tags?.push(tag)
//   }
// }

// export default new StoreTags