import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";

const MenuListItems: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    Cookies.remove('token');
    sessionStorage.clear();
    navigate('/login')
  };  

  return(
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Recruits" />
    </ListItemButton>
    <ListItemButton component={Link} to="/bop-attendance">
      <ListItemIcon>
        <EventAvailableIcon />
      </ListItemIcon>
      <ListItemText primary="BOP Attendance" />
    </ListItemButton>
    <ListItemButton component={Link} to="/bop">
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Add BOP" />
    </ListItemButton>
    <ListItemButton component={Link} to="/reports">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItemButton>
  </React.Fragment>
  )
}
export default MenuListItems;