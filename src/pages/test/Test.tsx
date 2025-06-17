import useLastActive from "@/pages/test/useLastActive";
import StoreForm from "@/shared/stores/Store-Form";
import {useEffect, useState} from "react";

function Test() {

  // const asd = useLastActive(StoreForm.form!.last_active)
	// const last_active = new Date(StoreForm.form!.last_active).getTime();

	return "test"
}

export default Test;

// const resolver = z.object({
//   first: z.string(),
//   second: z.string(),
//   third: z.string(),
// })

// const methods = useForm({resolver: zodResolver(resolver), defaultValues: {first: "asdsada", second: "gfgfgfg", third: "ererere"}})

// return (
//   <main>
//     <form onSubmit={methods.handleSubmit(data => console.log(data))}>
//       <FormProvider {...methods}>
//         <Component name="first" row="1"  />
//         <Component name="second" row="2"  />
//         <Component name="third" row="3"  />
//         {/* <p>Поле 1</p>
//         <input type="text" {...register("first")} />
//         <p>Поле 2</p>
//         <input type="text" {...register("second")} />
//         <p>Поле 3</p>
//         <input type="text" {...register("third")} /> */}
//         <button>Сабмит</button>
//       </FormProvider>
//     </form>
//   </main>
// )
