import StoreMessagesManager from "@app/client/pages/Messages/store/Store-Messages-Manager";
import { Message } from "@app/types/gen/Users";

class StoreMessagesLogic {
	socketGet = (data: Message) => {
		console.log("[MESSAGE LOGIC GET]: SOCKET, DATA ПОЛУЧЕНА", data);
		const store = StoreMessagesManager.getOrIgnore(data.fromid);
		console.log(store, data.fromid)
		if (store) store.messages?.push(data);
	};

	socketPut = (data: Message) => {
		console.log("[MESSAGE LOGIC PUT]: SOCKET, DATA ПОЛУЧЕНА", data);
		const store = StoreMessagesManager.getOrIgnore(data.fromid);
		if (store) {
			store.messages = store.messages!.map(e =>
				e.id === data.id ? { ...e, text: data.text, files: data.files } : e,
			);
		}
	};

	socketDelete = (id: number, fromid: number) => {
		console.log("[MESSAGE LOGIC DELETE]: SOCKET, DATA ПОЛУЧЕНА", id);
		const store = StoreMessagesManager.getOrIgnore(fromid);
		if (store) {
			store.messages = store.messages!.filter(e => e.id != id);
		}
	};
}

export default StoreMessagesLogic;
