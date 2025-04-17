import { Configuration } from "webpack"
import { BuildOptions } from "./types"

function buildResolvers(options: BuildOptions): Configuration['resolve'] {
    return (
        {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@': options.paths.src,
                "@s": options.paths.server
            }
        }
    )
}

export default buildResolvers