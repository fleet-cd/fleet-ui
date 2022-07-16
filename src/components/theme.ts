import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: "#252A31",
    },
    secondary: {
      main: "#4C90F0",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;