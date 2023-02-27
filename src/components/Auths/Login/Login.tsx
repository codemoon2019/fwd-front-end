import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import FaceIcon from '@mui/icons-material/Face';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, Theme, makeStyles, createStyles } from "@mui/material/styles";
import EmailField from "../../UI/Fields/EmailField";
import PasswordField from "../../UI/Fields/PasswordField";
import checkValid from "../../../util/checkvalid";
import { useStyles, internalUseStyles } from "./Styles";

type InitialType = { text: string; error: string };
{
  /*To be moved to another component*/
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://fws.com/">
        FWD
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export interface LoginProps {
  handleSignIn?: (username: string, password: string) => void;
  hideTabs?: boolean;
  textFieldVariant?: "outlined" | "filled" | "standard";
  emailValidator?: (value: string) => boolean;
  passwordValidator?: (value: string) => boolean;
}
interface NaviProps {
  goToForget?: () => any;
  goToSignUp?: () => any;
}

const INITIAL: InitialType = { text: "", error: "" };

const Login: React.FC<LoginProps & NaviProps> = ({
  hideTabs = false,
  textFieldVariant = "filled",
  emailValidator = (e) => !!e,
  passwordValidator = (e) => !!e,
}) => {
  const classes = useStyles();

  const internalClasses = internalUseStyles();

  const [email, setEmail] = React.useState<InitialType>(INITIAL);
  const [password, setPassword] = React.useState(INITIAL);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = React.useCallback(async () => {
    if (
      ![
        checkValid(email, setEmail, emailValidator),
        checkValid(password, setPassword, passwordValidator),
      ].every((v) => v)
    )
      return;
  }, [email, password]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={12} md={5} component={Paper} elevation={8} square>
          <Box
            sx={{
              mx: {xs: 2, sm: 4, md: 4},
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: 'center',
              height:'100vh'
            }}
          >
            <Avatar
              sx={{ m: 2, bgcolor: '#e87722', width: 150, height: 150 }}
            >
              <FaceIcon sx={{ width: 150, height: 150 }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box p={2}>
              <EmailField {...{ email, setEmail, textFieldVariant, loading }} />
              <PasswordField
                {...{ password, setPassword, textFieldVariant, loading }}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                align="right"
                style={{ cursor: "pointer" }}
              >
                Forget Password?
              </Typography>
              <FormControl margin="normal" fullWidth>
                <Button
                  className={internalClasses.button}
                  onClick={handleSubmit}
                  style={{ textTransform: "none"}}
                  size="large"
                  disabled={loading}
                  variant="outlined"
                  color="warning"
                  fullWidth
                >
                 <span className={internalClasses.text}>Login</span>
                </Button>
              </FormControl>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                style={{ cursor: "pointer" }}
              >
                No Account? Create Now
              </Typography>
              <Copyright sx={{ mt: 6 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
