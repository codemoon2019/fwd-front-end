import React from "react";
import Box from "@mui/material/Box";
import Button  from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const ThankYouScreen: React.FC = () => {
  const handleSubmit = () => {
    window.location.reload();
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          lg={8}
          sx={{
            backgroundImage: '',
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={12} md={5} lg={4} component={Paper} elevation={8} square>
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
            <Typography component="h1" variant="h5">
              Application Submitted. Thankyou!
            </Typography>
            <Button color="warning" onClick={handleSubmit}>Submit an another application</Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ThankYouScreen;
