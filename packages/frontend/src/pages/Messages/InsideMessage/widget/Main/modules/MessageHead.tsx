import { Message } from "@app/types/gen/Users";
import { createContext, useContext, useEffect, useState } from "react";
import MessageBody from "./MessageBody";
import { MessageFiles } from "@app/client/types/DTOClient";
import { observer } from "mobx-react-lite";
import { MessagesContext } from "@app/client/pages/Messages/InsideMessage/Messages";
import StoreForm from "@app/client/shared/stores/Store-Form";

// files, value, inputNewFile, textInput, submitClick, clickDeleteFile

interface propsInterface {
	msg: Message;
	editing: boolean;
	setEditMessage: React.Dispatch<React.SetStateAction<number | null>>;
}

interface contextInterface {
	value: string;
	files: MessageFiles | null;
	clickDeleteFile: (item: string) => any;
	inputNewFile: (e: React.ChangeEvent<HTMLInputElement>) => any;
	textInput: (e: React.ChangeEvent<HTMLInputElement>) => any;
	submitClick: () => any;
	deleteClick: () => void;
}

export const MessageContext = createContext<contextInterface | null>(null);

function MessageHead({ msg, editing, setEditMessage }: propsInterface) {
	// console.log("MODULE RENDER", msg.id)
	const StoreMessages = useContext(MessagesContext)!;
	const [value, setValue] = useState("");
	const [files, setFiles] = useState<{ new: FileList | null; old: string[] } | null>(null);

	useEffect(() => {
		if (editing) {
			setValue(msg.text);
			setFiles({ new: null, old: Array.isArray(msg?.files) ? msg.files : [] });
		}
	}, [editing, msg.files, msg.text]);

	const changeClick = () => {
		if (msg.fromid === StoreForm.form?.id && StoreMessages.is_match) setEditMessage(editing ? null : msg.id!);
	}

	const deleteClick = () => StoreMessages.delete(msg.id!)

	// const submitClick = useCallback(() => {StoreMessages.put({...msg, text: value, files: files!}); setEditMessage(null)}, [msg, value, files, setEditMessage])

	const submitClick = () => {
    const total = { ...msg, text: value, files: files!, deleted: [] };
		StoreMessages.put(total);
		setEditMessage(null);
	};

	const inputNewFile = (e: React.ChangeEvent<HTMLInputElement>) => setFiles(prev => ({ ...prev!, new: e.target.files }))

	const textInput = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

	const clickDeleteFile = (item: string) => setFiles(prev => ({ ...prev!, old: prev!.old!.filter(file => file != item) }))

	const context = {
		value,
		files,
		inputNewFile,
		textInput,
		submitClick,
		clickDeleteFile,
		deleteClick,
	};

	return (
		<MessageContext.Provider value={context}>
			<MessageBody editing={editing} msg={msg} changeClick={changeClick} />
		</MessageContext.Provider>
	);
}

export default observer(MessageHead);
