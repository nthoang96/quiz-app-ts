import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "rgba(16 18 27 / 40%)",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
    text: {
      primary: "#f9fafb",
    },
  },
});
