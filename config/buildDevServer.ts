import { Configuration } from "mini-css-extract-plugin"
import { BuildOptions } from "./types"

function buildDevServer(options: BuildOptions): Configuration['devServer'] {
    const isDev = options.mode == 'development';
	const isProd = options.mode == 'production';

    return (
        {   // static: {
            // 	directory: path.join(__dirname, 'public'),
            // },
            open: true,
            hot: true,
            // compress: true,
            port: options.port ?? '5000',
            historyApiFallback: true
        }
    )
}

export default buildDevServer