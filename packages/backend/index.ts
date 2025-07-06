import path from "path";

// ts
// PROCESS CWD D:\JavaScript\Esoft-project\packages\backend
// CERTS D:\JavaScript\Esoft-project\packages\backend\certs\192.168.1.125.pem
// PROCESS CWD DIRNAME D:\JavaScript\Esoft-project\packages\backend
// PATH ABSOULET |||                  D:\JavaScript\Esoft-project\certs
// PATH CWD |||                       D:\JavaScript\Esoft-project\certs
// REDIST DOTENV CONFIG RageAgainstTheMachine
// PATHS CERT D:\JavaScript\Esoft-project\packages\backend\certs\192.168.1.125.pem KEY D:\JavaScript\Esoft-project\packages\backend certs 192.168.1.125-key.pem

// js
// PROCESS CWD D:\JavaScript\Esoft-project\packages\backend
// CERTS D:\JavaScript\Esoft-project\packages\backend\certs\192.168.1.125.pem
// PROCESS CWD DIRNAME D:\JavaScript\Esoft-project\packages\backend
// PATH ABSOULET |||                  D:\JavaScript\Esoft-project\packages\backend\certs
// PATH CWD |||                       D:\JavaScript\Esoft-project\certs
// REDIST DOTENV CONFIG RageAgainstTheMachine
// PATHS CERT D:\JavaScript\Esoft-project\packages\backend\certs\192.168.1.125.pem KEY D:\JavaScript\Esoft-project\packages\backend certs 192.168.1.125-key.pem

// ts
// PATH ABSOULET |||                  D:\JavaScript\Esoft-project\certs
// PATH CWD |||                       D:\JavaScript\Esoft-project\certs

// js
// PATH ABSOULET |||                  D:\JavaScript\Esoft-project\packages\backend\certs
// PATH CWD |||                       D:\JavaScript\Esoft-project\certs

// console.log("PROCESS CWD", process.cwd())
// console.log("CERTS", path.resolve(process.cwd(), "certs", "192.168.1.125.pem"))
// console.log("PROCESS CWD DIRNAME", path.resolve(__dirname, process.cwd()))

// console.log("PATH ABSOULET |||                 ", path.resolve(__dirname, "..", "..", "certs", "192.168.1.125.pem"))
// console.log("PATH CWD |||                      ", path.resolve(process.cwd(), "..", "..", "certs", "192.168.1.125.pem"))

// ПОИСК env

console.log(path.resolve(process.cwd(), ".env"))

import dotenv from "dotenv"
dotenv.config({path: path.resolve(process.cwd(), ".env")})

import appBindingsContainer from "@app/server/config/containers/container.di";
import App from "@app/server/server/server";
import "@app/server/types/declarations/index"

async function bootstrap():Promise<void> {
	const app = appBindingsContainer.get<App>(App);

	await app.init();
}

export const boot = bootstrap();
