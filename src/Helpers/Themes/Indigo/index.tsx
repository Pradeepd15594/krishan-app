import { createTheme } from "@mui/material";
import { orange, indigo, red, lightBlue, } from "@mui/material/colors";


export default function Indigo() {
    const themes = createTheme({
        palette: {
            mode: 'light',
            common: {
                black: '#000',
                white: '#fff'
            },
            primary: { main: orange[900] },
            secondary: { main: indigo[600] },
            text: {
                primary: lightBlue[800],
                secondary: red[500],
                disabled: lightBlue[200]
            },
            //   primary:{main:}
            // action: {
            //   disabled: lightGreen[300]
            // },
            // divider: grey[700],
            background: {
                paper: '#FFFFFF',
                default: '#EDEDED'
            }
        }
    })
    return themes;
}