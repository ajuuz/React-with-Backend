import React from 'react'

// for routing
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

// components

import Header from './Components/Header/Header';

// pages
import Home from './Pages/User/Home/Home';
import About from './Pages/About/About';
import UserSignIn from './Pages/User/SignIn/SignIn';
import UserSignUp from './Pages/User/SignUp/SignUp';
import AdminSignIn from './Pages/Admin/SignIn';
import UserProfile from './Pages/User/UserProfile/UserProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='user/signin' element={<UserSignIn/>}/>
        <Route path='user/signup' element={<UserSignUp/>}/>
        <Route path='user/profile' element={<UserProfile/>}/>
        <Route path='admin/signin' element={<AdminSignIn/>}/>
      </Routes>
    </Router>
  )
}

export default App;
