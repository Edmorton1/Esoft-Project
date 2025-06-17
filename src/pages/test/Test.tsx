import Component from "@/pages/test/Component";
import useGeolocation from "@/shared/hooks/useGeolocation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const resolver = z.object({
  first: z.string(),
  second: z.string(),
  third: z.string(),
})

function Test() {
  const methods = useForm({resolver: zodResolver(resolver), defaultValues: {first: "asdsada", second: "gfgfgfg", third: "ererere"}})

  return (
    <main>
      <form onSubmit={methods.handleSubmit(data => console.log(data))}>
        <FormProvider {...methods}>
          <Component name="first" row="1"  />
          <Component name="second" row="2"  />
          <Component name="third" row="3"  />
          {/* <p>Поле 1</p>
          <input type="text" {...register("first")} />
          <p>Поле 2</p>
          <input type="text" {...register("second")} />
          <p>Поле 3</p>
          <input type="text" {...register("third")} /> */}
          <button>Сабмит</button>
        </FormProvider>
      </form>
    </main>

  )
}

export default Test