import { useEffect, useState } from "react";

const text = 'Был(а) в сети '

function useLastActive(last_active?: string) {
  const [time, setTime] = useState(new Date());
  const [after, setAfter] = useState(1000);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!last_active) return;
    const lastActive = new Date(last_active).getTime();

    const timer = setTimeout(() => {
      console.log("РЕРЕНДЕР, СЛЕДУЩИЙ РЕРЕНДЕР БУДЕТ ЧЕРЕЗ", after)
      const now = new Date();
      setTime(now);

      const diff = now.getTime() - lastActive;
      const minutes = Math.floor(diff / 1000 / 60);

      let nextAfter = 1000;
      let labelText = "";

      if (minutes < 1) {
        labelText = "Сейчас в сети";
        nextAfter = 60 * 1000 - diff;
      } else if (minutes < 2) {
        labelText = text + "недавно"
        nextAfter = 60 * 1000 - diff;
      } else if (minutes < 60) {
        labelText = text + `${minutes} минут назад`;
        nextAfter = 60 * 1000 - (diff % (60 * 1000));
      } else if (minutes <= 1440) {
        const hours = Math.floor(minutes / 60);
        labelText = text + `${hours} часов назад`;
        nextAfter = 60 * 60 * 1000 - (diff % (60 * 60 * 1000));
      } else {
        const days = Math.floor(minutes / 1440);
        labelText = text + `${days} дней назад`;
        nextAfter = 24 * 60 * 60 * 1000 - (diff % (24 * 60 * 60 * 1000));
      }

      setLabel(labelText);
      setAfter(nextAfter);
    }, after);

    return () => clearTimeout(timer);
  }, [time, after, last_active]);

  return label
}

export default useLastActive;

  // return (
  //   <main>
  //     <p>ласт актив: {JSON.stringify(lastActive)}</p>
  //     <p>Парс: {label}</p>
  //   </main>
  // );

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
