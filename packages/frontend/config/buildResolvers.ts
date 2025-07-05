import {Configuration} from "webpack";
import {BuildOptions} from "./types";

		// "paths": {
		// 	"@app/types/*": ["./packages/types/*"],
		// 	"@app/shared/*": ["./packages/shared/*"],
		// 	"@app/client/*": ["./packages/frontend/src/*"],
		// 	"@app/server/*": ["./packages/backend/server/*"]
		// }

function buildResolvers(options: BuildOptions): Configuration["resolve"] {
	return {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"@app/client": options.paths.src,
			"@app/shared": options.paths.shared,
			"@app/types": options.paths.types
		}
	};
}

export default buildResolvers;
