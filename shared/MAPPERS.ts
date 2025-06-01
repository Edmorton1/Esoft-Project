import { msg, MsgTypesClient, MsgTypesServer, SocketMessageClientInterface, SocketMessageServerInterface, Tables } from "@t/gen/types"

export function toTS<T extends keyof Tables>(entity: any): Tables[T][] {
    // return entity.rows.length > 1 ? entity.rows : entity.rows[0]
    return entity.rows
}

export function toSQL(domainModel: any) {
  if (typeof domainModel == "string" || typeof domainModel == "object") {
    return `'${domainModel}'`
  } else if (typeof domainModel == "undefined") {
    return 'IS NULL'
  } 
  return domainModel
}

// export const frJSON = <T>(data: string): T | undefined => {
//   return JSON.parse(data.toString())
// }

export const frJSON = <T>(data: string): T => {
  return JSON.parse(data.toString())
}

export const toJSON = <T>(data: T): string => {
  return JSON.stringify(data)
}

export function frSOSe(msg: any): SocketMessageServerInterface {
  return JSON.parse(msg.toString())
}

export function frSOCl(msg: any): SocketMessageClientInterface {
    return JSON.parse(msg.toString())
}

export function toSOSe<T extends msg>(type: T, data: MsgTypesServer[T]) {
  return toJSON({data, type})
}

export function toSOCl<T extends msg>(type: T, data: MsgTypesClient[T]) {
  return toJSON({data, type})
}

export const toCl = <T>(response: any): T => {
  // if (!data.data) {
  //   return null
  // }
  return response.data
}

export function one<T>(data: T[]): T {
  return data[0]
}

export function toArr(data: string | null | undefined) {
  return data?.trim().split(',').map(e => e.trim())
}

export function blobToFile(blob: Blob, fileName: string, type = blob.type): File {
  return new File([blob], fileName, { type });
}

// export const parseWKB = (hex: string) => {
//   // Примерная декодировка — самописная или библиотека
//   // Лучше не писать самому, а использовать библиотеку
//   const buf = Buffer.from(hex, 'hex');
//   const lng = buf.readDoubleLE(9);
//   const lat = buf.readDoubleLE(17);
//   return { lat, lng };
// };

export function parseWkbPoint(wkbHex: string): [number, number] {
	const buffer = new ArrayBuffer(wkbHex.length / 2);
	const view = new DataView(buffer);

	for (let i = 0; i < wkbHex.length; i += 2) {
		view.setUint8(i / 2, parseInt(wkbHex.substr(i, 2), 16));
	}

	// Byte order: 1 = little endian
	const littleEndian = view.getUint8(0) === 1;

	// skip 1 (byte order) + 4 (geometry type) + 4 (SRID)
	const offset = 9;
	const lng = view.getFloat64(offset, littleEndian);      // X
	const lat = view.getFloat64(offset + 8, littleEndian);  // Y

	return [lng, lat];
}
