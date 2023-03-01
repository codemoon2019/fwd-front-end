import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import GuestRoute from './routes/GuestRoute';
import Cookies from 'js-cookie';
import * as component from './components'
const App: React.FC = () => {

  const [auth, setAuth] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      //To check if the use is authenticated
      const isAuthenticated = () => {
        const cookie = Cookies.get('token');
        return cookie !== undefined
      };
      setAuth(isAuthenticated());
    })
  }, []);

  return (
      <Router basename={'/smart-recruitment'}>
        <Routes>
          <Route element={<PrivateRoute isAuthenticated={auth}/>}>
            <Route path='/' element={<component.Dashboard Page="RecruitmentList" PageName="Recruitment Module" />}/>
            <Route path='/bop' element={<component.Dashboard Page="BOP" PageName="BOP Module"/>}/>
            <Route path='/bop-attendance' element={<component.Dashboard Page="BOPAttendance" PageName="BOP Attendance"/>}/>
            <Route path='/reports' element={<component.Dashboard Page="Reports" PageName="Reports"/>}/>
          </Route>
          <Route element={<GuestRoute isAuthenticated={auth}/>}>
            <Route path="/login" element={<component.Login/>} />
          </Route>
          <Route path='/recruitment-form' element={<component.RecruitmentForm/>}/>
          <Route path='*' element={<component.NotFound/>} />
        </Routes>
      </Router>
  );
}

export default App;
