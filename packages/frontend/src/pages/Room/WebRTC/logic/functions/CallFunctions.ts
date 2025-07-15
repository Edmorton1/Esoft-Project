import MediaPermissions from "@app/client/pages/Room/WebRTC/logic/MediaPermissions";
import StoreSocket from "@app/client/shared/api/Store-Socket";
import StoreUser from "@app/client/shared/stores/Store-User";

export const checkPermissions = (frid: number) =>
	MediaPermissions.getDevices().then(devices => {
		if (!navigator.mediaDevices) {
			throw "Не подключено ни одно устройство";
		}
		if (devices.every(e => !e)) {
			if (StoreUser.user?.id === frid) {
				throw "Вы не дали разрешение на использование устройств";
			}
			throw "Вам позвонили, но у вас нет разрешения на использование устройств";
		}
	});

export const sendCancel = (frid: number) => {
	StoreSocket.socket?.send(
		JSON.stringify({
			type: "cancel",
			data: frid!,
		}),
	);
};
