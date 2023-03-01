import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import {
  getRecruits, assignAgent, markPresent
} from 'http/recruitment/RecruitmentAPI';
import Select from "@mui/material/Select";
import Swal from 'sweetalert2'
import { useStyles } from "./Styles";
import RecruitList from "../RecruitList/RecruitList";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const BOPAttendance: React.FC = () => {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const [recruitID, setRecruitID] = React.useState(0);
  const [agent, setAgent] = React.useState("");

  const handleOpen = (id: number) => {
    setOpenModal(false);
    Swal.fire({
      text: "Are you sure that you want to mark this agent as present ?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        markPresent(recruitID).then((result) => {
            console.log(result)
        })
      } else {
        Swal.close()
      }
    })
    setRecruitID(id)
  };
  const handleClose = () => setOpenModal(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [data, setData] = React.useState([]);

  interface Column {
    id:
    | "name"
    | "dateRegistered"
    | "recruiter"
    | "branch"
    | "mobile"
    | "location"
    | "email"
    | "bop"
    | "isPresent";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "dateRegistered", label: "Date Registered", minWidth: 170 },
    {
      id: "recruiter",
      label: "Recruiter",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "branch",
      label: "Branch Name",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "mobile",
      label: "Mobile",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "location",
      label: "Location",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "email",
      label: "Email",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "bop",
      label: "BOP",
      format: (value: number) => value.toFixed(2),
    },
    {
        id: "isPresent",
        label: "Present",
        format: (value: number) => value.toFixed(2),
      },
  ];

  interface Data {
    id: number;
    name: string;
    dateRegistered: string;
    recruiter: string;
    branch: string;
    mobile: string;
    location: string;
    email: string;
    bop: string;
    isPresent: string;
  }

  function createData(
    id: number,
    name: string,
    dateRegistered: string,
    recruiter: string,
    branch: string,
    mobile: string,
    location: string,
    email: string,
    bop: string,
    isPresent: string
  ): Data {
    return {
      id,
      name,
      dateRegistered,
      recruiter,
      branch,
      mobile,
      location,
      email,
      bop,
      isPresent
    };
  }

  React.useEffect(() => {
    async function fetchDataAsync() {
      await getRecruits();
      const savedArray = JSON.parse(localStorage.getItem('recruitList') || '[]');
      setData(savedArray);
      console.log(savedArray)
    }
    const interval = setInterval(() => {
      fetchDataAsync();
    }, 1000);
  }, []);

  const rowsFunction = () => {
    let newArray = [];
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        console.log(i)
        newArray.push(createData(
          data[i]['id'],
          `${data[i]['first_name']} ${data[i]['middle_name']} ${data[i]['last_name']}`,
          data[i]['created_at'],
          data[i]['recruiter'] === "" || data[i]['recruiter'] === null ? "N/A" : data[i]['recruiter'],
          data[i]['branch'],
          data[i]['mobile_number'],
          `${data[i]['province']}, ${data[i]['city']}`,
          data[i]['email'],
          data[i]['bop'],
          data[i]['isPresent'] === null ? "No" : "Yes",
        ))
      }
    }
    return newArray;
  }

  const rowsData = rowsFunction();

  return (
    <>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        component={Paper}
        elevation={2}
        margin={2}
        padding={2}
      >
        <Typography component="h1" variant="h5">
          Recruit List
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ cursor: "pointer" }}
        >
          This section provides a comprehensive view of all candidates who
          have applied for open positions within your organization.
        </Typography>
        <Divider style={{ marginTop: 15, marginBottom: 15 }} />
        <Grid container>
          <Grid item xs={12} md={3}>
            <FormControl margin="normal" fullWidth>
              <Autocomplete
                disablePortal
                id="bop"
                options={["BOP 1", "BOP 2"]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by BOP"
                    variant="standard"
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>

        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsData
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      onClick={() => handleOpen(row.id)}
                      tabIndex={-1}
                      key={row.id}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rowsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </>
  )
}

export default BOPAttendance;