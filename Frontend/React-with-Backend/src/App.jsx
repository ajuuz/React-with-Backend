import React from 'react'

// for routing
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

// components

import Header from './Components/Header/Header';

// pages
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import UserDashboard from './Pages/Dashboards/UserDashboard/UserDashboard';
import UserSignIn from './Pages/User/SignIn/SignIn';
import UserSignUp from './Pages/User/SignUp/SignUp';
import AdminSignIn from './Pages/Admin/SignIn';


const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='auth/user/signin' element={<UserSignIn/>}/>
        <Route path='auth/user/signup' element={<UserSignUp/>}/>
        <Route path='auth/admin/signin' element={<AdminSignIn/>}/>
        <Route path='user/dashboard' element={<UserDashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App;
