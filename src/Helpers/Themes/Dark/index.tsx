import { createTheme } from "@mui/material";
import { grey, lightGreen, red } from "@mui/material/colors";


export default function Dark(){
    const themes=createTheme({
        // palette:{
        //   mode:'light',
        //   primary:{main:orange[500]},
        //   secondary:{main:yellow[500]},
        // },
        palette: {
          mode:'dark',
          // common: {
          //   black: '#000',
          //   white: '#fff'
          // },
          text: {
            primary: lightGreen[800],
            secondary: red[500],
            disabled: lightGreen[200]
          },
          // action: {
          //   disabled: lightGreen[300]
          // },
          // divider: grey[700],
          background: {
            paper: grey[800],
            default: grey[700]
          }
        }
      })
    return themes;
}