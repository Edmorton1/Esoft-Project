const TYPES = {
  clients: Symbol.for("clients"),
  
  CRUD: {
    Factory: Symbol.for("CRUDControllerFactory"),
    Tables : {
      users: Symbol.for("users"),
      forms: Symbol.for("forms"),
      likes: Symbol.for("likes"),
      messages: Symbol.for("messages"),
      tags: Symbol.for("tags"),
      user_tags: Symbol.for("user_tags")
    },
  },
}

export default TYPES