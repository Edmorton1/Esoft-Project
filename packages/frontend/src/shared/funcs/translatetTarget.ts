import { TargetType } from "@app/types/gen/Users";

export function translateTarget(target: TargetType) {
  switch (target) {
    case "relation":
      return "отношения"
    case "chat":
      return "чатинг"
    case "friend":
      return "дружба"
    case "hobby":
      return "хобби"
  }
}
