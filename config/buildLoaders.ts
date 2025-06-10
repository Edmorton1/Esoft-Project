import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types";
import {buildBabelLoader} from "./buildBabelLoader";

function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
	const isDev = options.mode == "development";
	const isProd = options.mode == "production";

	return [
		{
			test: /\.module\.s[ac]ss$/i,
			use: [
				isProd ? MiniCssExtractPlugin.loader : "style-loader",
				{
					loader: "css-loader",
					options: {
						modules: {
							localIdentName: isProd 
              ? "[hash:base64]" 
              : "[path][name]__[local]",
						},
					},
				},
				{
					loader: "sass-loader",
					options: {
						sassOptions: {
							includePaths: [options.paths.src]
						}
					}
				},
			],
		},
		{
			test: /\.s[ac]ss$/i,
      exclude: /\.module\.s[ac]ss$/i,
			use: [
				isProd ? MiniCssExtractPlugin.loader : "style-loader",
        "css-loader",
				{
					loader: "sass-loader",
					options: {
						sassOptions: {
							includePaths: [options.paths.src]
						}
					}
				},
			],
		},
		{
			test: /\.(png|jpg|jpeg|gif)$/i,
			type: "asset/resource",
		},
		{
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		},
		{
			test: /\.tsx?$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: buildBabelLoader(options),
			},
		},
	];
}

export default buildLoaders;

// ТС ЛОУДЕР
// {
//   test: /\.tsx?$/,
//   use: [
//     {
//       loader: 'ts-loader',
//       options: {
//         transpileOnly: true,
//         getCustomTransformers: () => ({
//           before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
//         })
//       }
//     }
//   ],
//   exclude: /node_modules/,
// },
