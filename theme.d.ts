import { PaletteOptions, Palette } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Palette {
		salmon: Palette["primary"];
	}

	interface PaletteOptions {
		salmon?: PaletteOptions["primary"];
	}
}

// Update the Button's color options to include a salmon option
declare module "@mui/material/Button" {
	interface ButtonPropsColorOverrides {
		salmon: true;
	}
}