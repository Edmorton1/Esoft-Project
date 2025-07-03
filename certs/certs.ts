import fs from "fs";
import path from "path";

export type certsType = {
	cert: Buffer<ArrayBufferLike>;
	key: Buffer<ArrayBufferLike>;
};

const certs = {
	cert: fs.readFileSync(path.resolve(__dirname, "192.168.1.125.pem")),
	key: fs.readFileSync(
		path.resolve(__dirname, "192.168.1.125-key.pem"),
	),
};

export default certs;
