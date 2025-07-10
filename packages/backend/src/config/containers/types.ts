const TYPES = {
	clients: Symbol.for("clients"),
	
	PinoService: Symbol.for("services-pino"),
	LoggerController: Symbol.for("controllers-logger"),
	DataBase: Symbol.for("DataBase"),

	CRUD: {
		Factory: Symbol.for("CRUDControllerFactory"),

		Controllers: {
			users: Symbol.for("crud-controller-users"),
			forms: Symbol.for("crud-controller-forms"),
			likes: Symbol.for("crud-controller-likes"),
			messages: Symbol.for("crud-controller-messages"),
			tags: Symbol.for("crud-controller-tags"),
			user_tags: Symbol.for("crud-controller-user_tags"),
			posts: Symbol.for("crud-controller-posts")
		},
	},

	Controllers: {
		Likes: Symbol.for("controllers-tables-likes"),
		Auth: Symbol.for("controllers-auth"),
		ExtendedSearch: Symbol.for("controllers-extended_search"),
		Form: Symbol.for("controllers-form"),
		Settings: Symbol.for("controllers-settings"),
		Messages: Symbol.for("controllers-messages"),
		MessagesOut: Symbol.for("controllers-messages_out"),
		Posts: Symbol.for("controllers-posts"),
		Yandex: Symbol.for("controllers-yandex")
	},
};

// logger.info({ТАЙПС_ГОЙДА: TYPES})

export default TYPES;
