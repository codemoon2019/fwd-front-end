import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
import ThankYouScreen from "components/AssetComponents/ThankYouScreen";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from '@mui/material';
import {
  postApplication,
} from 'http/recruitment/RecruitmentAPI';
import {
  getBopDataForDropdown,
} from 'http/bop/BopAPI';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from 'formik';
import * as yup from 'yup';
import * as data from "data/location";
import { useStyles } from "./Styles";
import Swal from 'sweetalert2'

type InitialType = { text: string; error: string };

const theme = createTheme();

//const INITIAL: InitialType = { text: "", error: "" };

const INITIAL = "";

interface RecruitmentForm {
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  province: string;
  city: string;
  email: string;
  phone: string;
  bop: string;
  recruiter: string;
  branch: string;
}

const initialValues: RecruitmentForm = {
  firstName: "",
  lastName: "",
  middleName: "",
  suffix: "",
  province: "",
  city: "",
  email: "",
  phone: "",
  bop: "",
  recruiter: "",
  branch: "",
};


const validationSchema = yup.object({
  lastName: yup.string()
    .matches(/^[a-zA-Z]+$/, 'This field must contain only letters')
    .max(15, "Must be 15 characters or less")
    .required("This field is required"),
  firstName: yup.string()
    .matches(/^[a-zA-Z]+$/, 'This field must contain only letters')
    .max(15, "Must be 15 characters or less")
    .required("This field is required"),
  middleName: yup.string()
    .matches(/^[a-zA-Z]+$/, 'This field must contain only letters')
    .max(15, "Must be 15 characters or less")
    .required("This field is required"),
  province: yup.string()
    .required("This field is required"),
  city: yup.string()
    .required("This field is required"),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup.string()
    .matches(/^\d{11}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  isToAttend: yup.mixed().oneOf(['Yes', 'No'], 'Please select an option'),
  bop: yup.string().test('bop-is-required', 'BOP is required', function (value) {
    const isToAttend = this.resolve(yup.ref('isToAttend'))
    if (isToAttend === 'Yes') {
      return yup.string().required().isValidSync(value)
    }
    return true
  }),
  isReferred: yup.mixed().oneOf(['Yes', 'No'], 'Please select an option'),
  referrer: yup.string().test('referrer-is-required', 'Referrer is required', function (value) {
    const isReferred = this.resolve(yup.ref('isReferred'))
    if (isReferred === 'Yes') {
      return yup.string().required().isValidSync(value)
    }
    return true
  }),
  branch: yup.string().test('branch-is-required', 'Branch is required', function (value) {
    const isReferred = this.resolve(yup.ref('isReferred'))
    if (isReferred === 'Yes') {
      return yup.string().required().isValidSync(value)
    }
    return true
  }),
});


const Login: React.FC = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      middleName: "",
      province: "",
      city: "",
      email: "",
      phone: "",
      suffix: "",
      isToAttend: "None",
      bop: "",
      isReferred: "None",
      referrer: "",
      branch: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      return postApplication({
        "first_name": values.firstName,
        "middle_name": values.middleName,
        "last_name": values.lastName,
        "suffix": values.suffix,
        "mobile_number": values.phone,
        "email": values.email,
        "province": values.province,
        "city": values.city,
        "isPlanToAttend": (values.isToAttend === "true") ? "1" : "0",
        "bop": values.bop,
        "isRecruit": (values.isReferred === "true") ? "1" : "0",
        "recruiter": values.referrer,
        "branch": values.branch
      }).then((result: any) => {
        if(result.status === 201){
          setSuccess(true);
          Swal.close()
        }
      });
    },
  });

  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [bopList, setBopList] = React.useState<string[]>([]);

  //Form Data
  const [province, setProvince] = React.useState<string[]>([]);
  const [city, setCity] = React.useState<string[]>([]);

  const handleSelectCity = (province: string) => {
    const places = data.data;
    const cities = Object.keys(places[province]);
    setCity(cities); // Output: { name: 'John', age: 30 }
  }

  const [isToAttend, setToAttend] =
    React.useState("");

  const [isReferred, setReferred] =
    React.useState("");

  const toAttendAnswer = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    formik.setFieldValue('isToAttend', (event.target as HTMLInputElement).value);
    setToAttend((event.target as HTMLInputElement).value);
  };

  const isReferredAnswer = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    formik.setFieldValue('isReferred', (event.target as HTMLInputElement).value);
    setReferred((event.target as HTMLInputElement).value);
  };

  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    setAccepted(true);
    handleClose();
  };


  React.useEffect(() => {
    setProvince(Object.keys(data.data))
    async function fetchDataAsync() {
      await getBopDataForDropdown();
      const savedArray = JSON.parse(localStorage.getItem('bopListDropdown') || '[]');
      setBopList(savedArray);
      console.log(bopList)
    }
   const interval = setInterval(() => {
      fetchDataAsync();
    }, 1000);
    return () => clearInterval(interval)

  }, [])

  return (<>
  { success && (
      <>
        <ThankYouScreen />
      </>
    )
  }
  { !success && (
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
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{ margin:10 }}>Terms and Conditions</DialogTitle>
            <DialogContent style={{ margin:10 }}>
              <DialogContentText>
                I hereby affirm that my answers to the foregoing questions are true and correct and that any falsification made herein shall be taken as sufficient grounds for disqualification on my application or my dismissal from the Company. I authorize the Company to collect, process, store, modify and destroy my information, as well as disclose, share or transfer this information to its principal, subsidiaries, affiliates, partners, agents, representatives, outsourced service providers, and to regulatory authorities or government entities, for legitimate purposes, including but not limited to:
                <br />
                <br />
                i. Process my application, including assisting me in my application for license to the Insurance Commission, conducting any background checks;
                <br />
                <br />
                ii. Administer my commissions, overrides, other benefits and entitlements, if any;
                <br />
                <br />
                iii. Provide advice or information covering products, services, promotions, contest, customer related services and the like, or communicate with me through mail/email/social media account/fax/SMS/telephone for any purpose;
                <br />
                <br />
                iv. Manage, review and analyse results of my information, production, and other performance based results for data analytics;
                <br />
                <br />
                v. Comply with applicable laws or regulations.
              </DialogContentText>
              <DialogContentText>
                By checking the box to the form, you agree to the terms and conditions above.
              </DialogContentText>
              <DialogActions>
              <Button style={{marginTop:10}} onClick={handleAccept} variant="outlined"
                color="warning">
                Back to Form and Accept
              </Button>
            </DialogActions>
            </DialogContent>
          </Dialog>
          <Box
            sx={{
              my: { xs: 2, md: 8, lg: 8 },
              mx: { xs: 2, md: 4, lg: 4 },
            }}
          >
            <form onSubmit={formik.handleSubmit}>
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
                        id="lastName"
                        label="Lastname"
                        variant="standard"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        className={classes.root}
                        id="firstName"
                        label="Firstname"
                        variant="standard"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        className={classes.root}
                        id="middleName"
                        label="Middlename"
                        variant="standard"
                        value={formik.values.middleName}
                        onChange={formik.handleChange}
                        error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                        helperText={formik.touched.middleName && formik.errors.middleName}

                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        className={classes.root}
                        id="suffix"
                        label="Suffix (if applicable)"
                        variant="standard"
                        value={formik.values.suffix}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} marginTop={0.2}>
                  <Grid item xs={12} md={3}>
                    <FormControl margin="normal" fullWidth>
                      <Autocomplete
                        disablePortal
                        id="province"
                        inputValue={formik.values.province}
                        onInputChange={(event, newInputValue) => {
                          formik.setFieldValue("province", newInputValue);
                          handleSelectCity(newInputValue);
                        }}
                        options={province}
                        renderInput={(params) => (
                          <TextField
                            className={classes.root}
                            {...params}
                            error={formik.touched.province && Boolean(formik.errors.province)}
                            helperText={formik.touched.province && formik.errors.province}
                            label="Province"
                            variant="standard"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl margin="normal" fullWidth>
                      <Autocomplete
                        disablePortal
                        id="city"
                        inputValue={formik.values.city}
                        onInputChange={(event, newInputValue) => {
                          formik.setFieldValue("city", newInputValue);
                        }}
                        options={city}
                        renderInput={(params) => (
                          <TextField
                            className={classes.root}
                            {...params}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                            label="City"
                            variant="standard"
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
                        id="email"
                        label="Email"
                        variant="standard"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}

                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        className={classes.root}
                        id="phone"
                        label="Phone"
                        variant="standard"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} top={5}>
                  <Grid item xs={12} md={12}>
                    <FormControl margin="normal" error={formik.touched.isToAttend && Boolean(formik.errors.isToAttend)}>
                      <FormLabel id="demo-row-radio-buttons-group-label" required>
                        Are you planning to attend a BOP ?
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={formik.values.isToAttend}
                        onChange={toAttendAnswer}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                    {formik.touched.isToAttend && Boolean(formik.errors.isToAttend) && (
                      <div>{formik.errors.isToAttend}</div>
                    )}
                  </Grid>
                </Grid>
                {isToAttend === "Yes" && (
                  <Grid container>
                    <Grid item xs={12} md={3}>
                      <FormControl margin="normal" fullWidth>
                        <Autocomplete
                          disablePortal
                          id="bop"
                          inputValue={formik.values.bop}
                          onInputChange={(event, newInputValue) => {
                            formik.setFieldValue("bop", newInputValue);
                          }}
                          options={bopList}
                          renderInput={(params) => (
                            <TextField
                              className={classes.root}
                              {...params}
                              error={formik.touched.bop && Boolean(formik.errors.bop)}
                              helperText={formik.touched.bop && formik.errors.bop}
                              label="Select BOP"
                              variant="standard"

                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                )}
                <Grid item xs={12} md={12}>
                  <FormControl margin="normal" component="fieldset" error={formik.touched.isReferred && Boolean(formik.errors.isReferred)}>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      We're you referred by an FWD planner?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      id="isReferred"
                      name="isReferred"
                      value={formik.values.isReferred}
                      onChange={isReferredAnswer}
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                  {formik.touched.isReferred && Boolean(formik.errors.isReferred) && (
                    <div>{formik.errors.isReferred}</div>
                  )}
                </Grid>
                {isReferred === "Yes" && (
                  <Grid spacing={2} top={5} container>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth margin="normal">
                        <TextField
                          className={classes.root}
                          id="referrer"
                          label="Name of refferrer"
                          variant="standard"
                          value={formik.values.referrer}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.referrer && Boolean(formik.errors.referrer)}
                          helperText={formik.touched.referrer && formik.errors.referrer}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl margin="normal" fullWidth>
                        <Autocomplete
                          disablePortal
                          id="branch"
                          inputValue={formik.values.branch}
                          onInputChange={(event, newInputValue) => {
                            formik.setFieldValue("branch", newInputValue);
                          }}
                          options={[
                            { label: "Branch 1" },
                            { label: "Branch 2" },
                            { label: "Branch 3" },
                          ]}
                          renderInput={(params) => (
                            <TextField
                              className={classes.root}
                              {...params}
                              error={formik.touched.branch && Boolean(formik.errors.branch)}
                              helperText={formik.touched.branch && formik.errors.branch}
                              label="Select Branch"
                              variant="standard"
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
                        <Link onClick={handleOpen} style={{cursor: 'pointer'}}>Terms and Conditions</Link> you agree that the information you provided will be used by
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
                        type="submit"
                        fullWidth
                      >
                        Submit Application
                      </Button>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    )}
  </>   
  );
};

export default Login;

