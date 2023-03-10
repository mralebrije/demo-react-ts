import { createTheme } from "@mui/material";

export const theme = {
  dark: createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#5893df",
      },
      secondary: {
        main: "#2ec5d3",
      },
      background: {
        default: "#192231",
        paper: "#1c3444",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 660, // give a little more width
        md: 980,
        lg: 1200,
        xl: 1536,
      },
    },
  }),
  light: createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#282f3b",
      },
      secondary: {
        main: "#525f79",
      },
      info: {
        main: "#676767",
      },
      background: {
        default: "white",
        paper: "#f1f1f1",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 660, // give a little more width
        md: 980,
        lg: 1200,
        xl: 1536,
      },
    },
  }),
};
