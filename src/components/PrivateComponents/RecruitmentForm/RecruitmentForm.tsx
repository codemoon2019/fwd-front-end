import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import {
  postApplication,
} from 'http/recruitment/RecruitmentAPI';
import { createTheme, ThemeProvider, makeStyles } from "@mui/material/styles";
import { connect } from "react-redux"
import checkValid from "util/checkvalid";
import * as data from "data/location";
import { useStyles } from "./Styles";

type InitialType = { text: string; error: string };

const theme = createTheme();

//const INITIAL: InitialType = { text: "", error: "" };

const INITIAL = "";

const Login: React.FC = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  //Form Data
  const [firstName, setFirstName] = React.useState(INITIAL);
  const [lastName, setLastName] = React.useState(INITIAL);
  const [middleName, setMiddleName] = React.useState(INITIAL);
  const [suffix, setSuffix] = React.useState(INITIAL);
  const [province, setProvince] = React.useState(INITIAL);
  const [city, setCity] = React.useState(INITIAL);
  const [email, setEmail] = React.useState(INITIAL);
  const [phone, setPhone] = React.useState(INITIAL);
  const [bop, setBop] = React.useState(INITIAL);
  const [recruiter, setRecruiter] = React.useState(INITIAL);
  const [branch, setBranch] = React.useState(INITIAL);

  const [value, setValue] = React.useState("");
  const [value2, setValue2] = React.useState("");
  const [cityList, setCityList] = React.useState<string[]>([]);

  const handleSubmitApplication = () => {
    postApplication({
      "first_name": firstName,
      "middle_name": middleName,
      "last_name": lastName,
      "suffix": suffix,
      "mobile_number": phone,
      "email": email,
      "province": province,
      "city": city,
      "isPlanToAttend": (isToAttend === "true") ? "1" : "0",
      "bop": bop,
      "isRecruit": (isReferred === "true") ? "1" : "0",
      "recruiter": recruiter,
      "branch": branch
    });
  };

  const [isToAttend, setToAttend] =
    React.useState("");

  const [isReferred, setReferred] =
    React.useState("");

  const toAttendAnswer = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setToAttend((event.target as HTMLInputElement).value);
  };

  const isReferredAnswer = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReferred((event.target as HTMLInputElement).value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        justifyContent="center"
        style={{ backgroundColor: "#e87722" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={12}
          md={10}
          sx={{ margin: { xs: 0, md: 4, lg: 4 }, padding: { xs: 0, md: 4, lg: 4 } }}
          component={Paper}
          elevation={5}
          style={{ height: '100%' }}
          square
        >
          <Box
            sx={{
              my: { xs: 2, md: 8, lg: 8 },
              mx: { xs: 2, md: 4, lg: 4 },
            }}
          >
            <Box p={2}>
              <Typography component="h1" variant="h5">
                Recruitment Form
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ cursor: "pointer" }}
              >
                Fill in the name and contact information in the designated
                fields.
              </Typography>
              <Divider style={{ marginTop: 15, marginBottom: 15, background: "#e87722" }} />
              <Grid container spacing={2} top={5}>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      className={classes.root}
                      id="outlined-basic"
                      label="Lastname"
                      variant="standard"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      className={classes.root}
                      id="outlined-basic"
                      label="Firstname"
                      variant="standard"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      className={classes.root}
                      id="outlined-basic"
                      label="Middlename"
                      variant="standard"
                      value={middleName}
                      onChange={(e) => {
                        setMiddleName(e.target.value);
                      }}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      className={classes.root}
                      id="outlined-basic"
                      label="Suffix (if applicable)"
                      variant="standard"
                      value={suffix}
                      onChange={(e) => {
                        setSuffix(e.target.value);
                      }}
                      required
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} marginTop={0.2}>
                <Grid item xs={12} md={3}>
                  <FormControl margin="normal" fullWidth>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      inputValue={province}
                      onInputChange={(event, newInputValue) => {
                        setProvince(newInputValue);
                      }}
                      options={[
                        "Test Province 1",
                        "Test Province 2",
                        "Test Province 3",
                      ]}
                      renderInput={(params) => (
                        <TextField
                          className={classes.root}
                          {...params}
                          label="Province"
                          variant="standard"
                          required
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl margin="normal" fullWidth>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      inputValue={city}
                      onInputChange={(event, newInputValue) => {
                        setCity(newInputValue);
                      }}
                      options={["City 1", "City 2", "City 3"]}
                      renderInput={(params) => (
                        <TextField
                          className={classes.root}
                          {...params}
                          label="City"
                          variant="standard"
                          required
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} marginTop={0.2}>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      className={classes.root}
                      id="outlined-basic"
                      label="Email"
                      variant="standard"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth margin="normal">
                    <TextField
                      className={classes.root}
                      id="outlined-basic"
                      label="Phone"
                      variant="standard"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      required
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} top={5}>
                <Grid item xs={12} md={12}>
                  <FormControl margin="normal">
                    <FormLabel id="demo-row-radio-buttons-group-label" required>
                      Are you planning to attend a BOP ?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={isToAttend}
                      onChange={toAttendAnswer}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              {isToAttend === "true" && (
                <Grid container>
                  <Grid item xs={12} md={3}>
                    <FormControl margin="normal" fullWidth>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        inputValue={bop}
                        onInputChange={(event, newInputValue) => {
                          setBop(newInputValue);
                        }}
                        options={[
                          { label: "BOP 1" },
                          { label: "BOP 2" },
                          { label: "BOP 3" },
                        ]}
                        renderInput={(params) => (
                          <TextField
                            className={classes.root}
                            {...params}
                            label="Select BOP"
                            variant="standard"
                            required
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12} md={12}>
                <FormControl margin="normal">
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    We're you referred by an FWD planner?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={isReferred}
                    onChange={isReferredAnswer}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {isReferred === "true" && (
                <Grid spacing={2} top={5} container>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        className={classes.root}
                        id="outlined-basic"
                        label="Name of refferrer"
                        variant="standard"
                        value={recruiter}
                        onChange={(e) => {
                          setRecruiter(e.target.value);
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl margin="normal" fullWidth>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        inputValue={branch}
                        onInputChange={(event, newInputValue) => {
                          setBranch(newInputValue);
                        }}
                        options={[
                          { label: "Ref 1" },
                          { label: "Ref 2" },
                          { label: "Ref 3" },
                        ]}
                        renderInput={(params) => (
                          <TextField
                            className={classes.root}
                            {...params}
                            label="Select Branch"
                            variant="standard"
                            required
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              )}
              <Grid container spacing={2} sx={{ marginTop: 3 }}>
                <Grid item md={12} container>
                  <Box display="flex" alignItems="center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(e) => setChecked(e.target.checked)}
                        />
                      }
                      label=""
                    />
                    <Box flexGrow={1}>
                      <Typography variant="body2">
                        You agree that the information you provided will be used by
                        FWD Life Insurance, its agents, employees, and
                        representatives, to set an appointment for meeting, request
                        for training and other recruitment activities with you.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} justifyContent="flex-end" sx={{ marginTop: 2 }}>
                <Grid item md={3} container>
                  <FormControl fullWidth margin="normal">
                    <Button
                      style={{ textTransform: "none" }}
                      size="large"
                      disabled={!checked}
                      variant="outlined"
                      color="warning"
                      onClick={handleSubmitApplication}
                      fullWidth
                    >
                      Submit Application
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;

