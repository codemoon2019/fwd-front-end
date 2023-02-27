import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import * as component from './components'
const App: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (username: string, password: string) => {
    //Perform authenticatin here
    setIsLoggedIn(false)
  }

  return (
      <Router>
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route path='/' element={<component.Dashboard Page="RecruitmentList" PageName="Recruitment Module" />}/>
            <Route path='/bop' element={<component.Dashboard Page="BOP" PageName="BOP Module"/>}/>
            <Route path='/reports' element={<component.Dashboard Page="Reports" PageName="Reports"/>}/>
            <Route path='/recruitment-form' element={<component.RecruitmentForm/>}/>
          </Route>
          <Route path="/login" element={<component.Login handleSignIn={handleLogin} />} />
          <Route path='*' element={<component.NotFound/>} />
        </Routes>
      </Router>
  );
}

export default App;
