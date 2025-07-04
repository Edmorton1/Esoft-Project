import { useEffect, useState } from "react";

const text = 'Был(а) в сети '

const cache = new Map<string, {label: string, after: number}>()

function useLastActive(last_active?: string) {
  const [after, setAfter] = useState(1000);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!last_active) return;
    const cached = cache.get(last_active)

    // console.log("СКОЛЬКО ВРЕМЕНИ ДО ОЧИСТКИ КЕША", cached?.after, cached?.label)
    cached && setTimeout(() => {cache.delete(last_active); console.log("ОЧИСТКА КЕША ДО ОЧИСТКИ БЫЛО", cached.after, cached.label)}, cached?.after)

    if (cached) return setLabel(cached.label);

    const timer = setTimeout(() => {
      const now = new Date().getTime()
      const lastActive = new Date(last_active).getTime();
      const diff = now - lastActive;

      let nextAfter = 1000;
      let labelText = "";

      if (diff < 60 * 1000) {
        labelText = "Сейчас в сети";
        nextAfter = 60 * 1000 - (diff % (60 * 1000));
      } else if (diff < 2 * 60 * 1000) {
        labelText = text + "недавно";
        nextAfter = 2 * 60 * 1000 - (diff % (2 * 60 * 1000));
      } else if (diff < 60 * 60 * 1000) {
        const minutes = Math.floor(diff / (60 * 1000));
        labelText = text + `${minutes} минут назад`;
        nextAfter = 60 * 1000 - (diff % (60 * 1000));
      } else if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        labelText = text + `${hours} часов назад`;
        nextAfter = 60 * 60 * 1000 - (diff % (60 * 60 * 1000));
      } else {
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        labelText = text + `${days} дней назад`;
        nextAfter = 24 * 60 * 60 * 1000 - (diff % (24 * 60 * 60 * 1000));
      }

      if (nextAfter < 1000) nextAfter = 1000

      console.log("РЕРЕНДЕР, СЛЕДУЩИЙ РЕРЕНДЕР БУДЕТ ЧЕРЕЗ", nextAfter)
      console.log("ВСЯ ИНФОРМАЦИЯ", nextAfter, labelText)

      cache.set(last_active, {label: labelText, after: nextAfter})
      setLabel(labelText);
      setAfter(nextAfter);
    }, after);

    return () => clearTimeout(timer);
  }, [after, last_active]);

  return label
}

export default useLastActive;
