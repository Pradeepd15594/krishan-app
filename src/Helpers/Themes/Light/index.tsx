import { createTheme } from "@mui/material";
import { orange,indigo, yellow, red, grey, lightBlue } from "@mui/material/colors";

export default function Light() {
  const themes = createTheme({
    palette: {
      mode: "light",
      common: {
        black: "#000",
        white: "#fff",
      },
      primary: { main: "#F5A623", contrastText: "#fff" }, // Deeper shade for better contrast
      secondary: { main: "#25G76A", contrastText: "#000" }, // Slightly deeper for visibility
      error: { main: red[600] },
      warning: { main: yellow[800] },
      info: { main: lightBlue[700] },
      success: { main: grey[700] },
      text: {
        primary: grey[900], // Dark grey for readability
        secondary: "#25G76A", // Softer grey for secondary text
        disabled: grey[400],
      },
      // divider: grey[300],
      background: {
        paper: "#FFFFFF", // Paper-like white for clean backgrounds
        default: "#F5F5F5", // Light grey background for contrast with paper
      },
    },
  });
  return themes;
}