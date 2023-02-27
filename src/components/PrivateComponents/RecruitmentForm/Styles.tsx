import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    root: {
      '& label.Mui-focused': {
        color: '#e87722',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#e87722',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#e87722',
        },
      },
    },
    formControl: {
        margin: 1,
        minWidth: 120,
      },
      selectEmpty: {
        marginTop:2,
      },
      selectBorder: {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'red', // Change this value to your desired border color
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'blue', // Change this value to your desired hover border color
        },
      },
    radio: {
        '&$checked': {
        color: '#4B8DF8'
        }
    },
    checked: {}
  })