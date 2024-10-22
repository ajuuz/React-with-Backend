import React from 'react'

// for routing
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

// components
import AuthComponenet from './Components/AuthComponents/AuthComponet';

// pages
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import UserDashboard from './Pages/Dashboards/UserDashboard/UserDashboard';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='auth/user/login' element={<AuthComponenet auth="USER LOGIN"/>}/>
        <Route path='auth/user/signup' element={<AuthComponenet auth="USER SIGNUP"/>}/>
        <Route path='auth/admin/login' element={<AuthComponenet auth="ADMIN LOGIN"/>}/>
        <Route path='user/dashboard' element={<UserDashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App;
