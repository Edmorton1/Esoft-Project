import $api from "@app/client/shared/api/api";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { Form, FormSchema, Message, MessageSchema } from "@app/types/gen/Users";
import { serverPaths } from "@app/shared/PATHS";
import { toFormData } from "@app/client/shared/funcs/filefuncs";
import {
	MessageDTOClient,
	MessagePutDTOClient,
	MessagePutDTOClientSchema,
} from "@app/client/types/DTOClient";
import { FILES_LIMIT, FILES_LIMIT_MESSAGE } from "@app/shared/CONST";
import z from "zod";
import { AxiosResponse } from "axios";
import { IS_MATCH } from "@app/shared/HEADERS";
import { nullToUndefined } from "@app/types/shared/zodSnippets";
import StoreMessagesLogic from "@app/client/pages/Messages/store/Store-Messages.logic";
import BroadCast from "@app/client/shared/stores/BroadCast";
import StoreUser from "@app/client/shared/stores/Store-User";
import StoreMessagesManager from "@app/client/pages/Messages/store/Store-Messages-Manager";

class StoreMessages {
	messages: Message[] | null = null;
	form: Form | null = null;
	cursor: number | null = null;
	is_match: boolean = false;
	private channel: BroadCast<"socketGet" | "socketPut" | "socketDelete">;
	private logic: StoreMessagesLogic;

	constructor(readonly toid: number) {
		makeAutoObservable(this);

		console.log("АЙДИ ПРИ ИНИЦИАЛИЗАЦИИ", StoreUser.user?.id)
		this.logic = new StoreMessagesLogic;
		this.channel = new BroadCast(`store-messages-${this.toid}`);
		this.channel.register({
			socketGet: this.logic.socketGet,
			socketPut: this.logic.socketPut,
			socketDelete: this.logic.socketDelete,
		});
	}

	checkFileLength = (count: any): boolean => {
		if (typeof count === "number" && count > FILES_LIMIT) {
			alert(FILES_LIMIT_MESSAGE);
			return true;
		}
		return false;
	};

	get = async (data: AxiosResponse) => {
		// {messages: Message[], form: Form}
		const is_match = data.headers[IS_MATCH] === "true";
		console.log("IS_MATCH", is_match);
		console.log("DATA DATAQ", data.data);

		runInAction(() => (this.is_match = is_match));
		const { messages, form } = z
			.object({
				messages: z.array(MessageSchema),
				form: z.preprocess(nullToUndefined, FormSchema.optional()),
			})
			.parse(data.data);
		console.log("ГЕТ МЕССАДЖ");

		runInAction(() => {
			if (this.messages !== null) {
				this.messages.unshift(...messages);
			} else if (form) {
				this.messages = messages;
				this.form = form;
			}
			console.log("THIS CURSOR NEW ", messages, this.cursor);
			this.cursor = messages[0]?.id;
		});

		console.log(this.messages, this.form);
		console.log(toJS(this.messages));
	};

	send = async (data: MessageDTOClient, toid: number) => {
		if (this.checkFileLength(data.files?.length)) return;

		const formdata = data.files ? await toFormData(data.files) : new FormData();
		console.log(data);

		formdata.append("json", JSON.stringify(data));

		console.log(formdata.get("files"), formdata.get("json"));
		const newMessage = (
			await $api.post(`${serverPaths.sendMessage}/${toid}`, formdata, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
		).data;

		// FIXME ДУБЛИРОВАНИЕ ЛОГИКИ В LOGIC
		const parsedMessage = MessageSchema.parse(newMessage);
		this.messages?.push(parsedMessage);

		// storeSocket.socket.send(JSON.stringify(data))
	};

	put = async (raw: MessagePutDTOClient) => {
		const data = MessagePutDTOClientSchema.parse(raw);
		console.log({ DATA_PARSED: data });
		const old = this.messages!.find(e => e.id == data.id)!;
		const fileLen =
			(data.files.new ? data.files.new?.length : 0) + data.files.old.length - data.deleted.length;

		if (this.checkFileLength(fileLen)) return;

		// let fd;

		console.log(data, toJS(old), `DLINA, ${fileLen}`, data.files);

		// fd = new FormData
		// fd.append('json', toJSON(data))

		data["deleted"] = old.files?.filter(e => !data.files.old?.includes(e)) ?? [];
		console.log(data, toJS(old), "messagedto");
		const newFiles = data.files.new!;

		const cleanData = data as Partial<MessagePutDTOClient>;
		delete cleanData.files;

		const fd = await toFormData(newFiles);
		fd.append("json", JSON.stringify(cleanData));

		console.log(data);

		const newMessage = (
			await $api.put(`${serverPaths.editMessage}/${data.id}`, fd, {
				headers: { "Content-Type": "multipart/form-data" },
			})
		).data;
		const parsedMessage = MessageSchema.parse(newMessage);

		// FIXME ДУБЛИРОВАНИЕ ЛОГИКИ В LOGIC
		this.messages = this.messages!.map(e =>
			e.id === parsedMessage.id
				? { ...e, text: parsedMessage.text, files: parsedMessage.files }
				: e,
		);
	};

	delete = async (id: number) => {
		console.log(id);
		await $api.delete(`${serverPaths.deleteMessage}/${id}`);
		// FIXME ДУБЛИРОВАНИЕ ЛОГИКИ В LOGIC
		this.messages = this.messages!.filter(e => e.id != id);
	};

	socketGet = (data: Message) => {
		console.log("СОКЕТ ГЕТ");
		console.log(toJS(StoreMessagesManager))

		this.logic.socketGet(data);
		this.channel.startFunction("socketGet", [data]);

		// if (data.toid === StoreUser.user!.id) {
		// 	return this.messages!.push(data);
		// }
		// return this.messages!.push(data);
	};

	socketPut = (data: Message) => {
		console.log(data);
		this.logic.socketPut(data);
		this.channel.startFunction("socketPut", [data]);
	};

	socketDelete = (id: number, fromid: number) => {
		this.logic.socketDelete(id, fromid);
		this.channel.startFunction("socketDelete", [id, fromid]);
	};
}

export default StoreMessages;
