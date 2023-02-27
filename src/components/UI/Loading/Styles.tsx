import { makeStyles } from "@mui/styles";

declare module '@mui/styles' {
    interface DefaultTheme {
      zIndex: {
        drawer: number;
        appBar: number;
        modal: number;
        snackbar: number;
        tooltip: number;
      };
    }
  }

export const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
  }))