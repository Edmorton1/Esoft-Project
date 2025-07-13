import StoreMessages from "@app/client/pages/Messages/store/Store-Messages";
import { Message } from "@app/types/gen/Users";

class StoreMessagesLogic {
	constructor(private readonly StoreMessages: StoreMessages) {}

	socketGet = (data: Message) => {
		this.StoreMessages.messages?.push(data);
	};

	socketPut = (data: Message) => {
		this.StoreMessages.messages! = this.StoreMessages.messages!.map(e =>
			e.id === data.id ? { ...e, text: data.text, files: data.files } : e,
		);
	};

	socketDelete = (id: number) => {
    this.StoreMessages.messages! = this.StoreMessages.messages!.filter(e => e.id != id);
  };
}

export default StoreMessagesLogic;
