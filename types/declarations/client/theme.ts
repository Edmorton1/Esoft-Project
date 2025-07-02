import { PaletteOptions, Palette } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    salmon: Palette["primary"];
    third: Palette["primary"];
    alt: Palette["primary"];
  }

  interface PaletteOptions {
    salmon?: PaletteOptions["primary"];
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
    salmon: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    salmon: true;
  }
}