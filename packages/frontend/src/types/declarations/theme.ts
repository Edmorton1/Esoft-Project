//@ts-expect-error
// eslint-disable-next-line
import type { PaletteOptions, Palette } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    plombir: Palette["primary"];
    third: Palette["primary"];
    alt: Palette["primary"];
  }

  interface PaletteOptions {
    plombir?: PaletteOptions["primary"];
    third?: PaletteOptions["primary"];
    alt?: PaletteOptions["primary"];
  }

  interface TypeBackground {
    third: string;
    alt: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    plombir: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    plombir: true;
  }
}
