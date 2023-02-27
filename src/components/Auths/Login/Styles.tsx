import { ThemeProvider, makeStyles, createStyles } from "@mui/styles";

export const useStyles = makeStyles({
    container:{
        position:"absolute",
        width:"45%",
        top:"50%",
        left:"50%",
        transform: "translate(-50%, -50%)"
    }
  })
  
export const internalUseStyles = makeStyles((theme) =>
createStyles({
  button: {
    position: 'relative',
    overflow: 'hidden',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      backgroundColor: '#e87722',
      transition: 'left 0.1s ease-out',
    },
    '&:hover:after': {
      left: '0',
    },
  },
  text: {
    position: 'relative',
    zIndex: 1,
    color:'rgba(0, 0, 0, 0.6)'
  },
})
);