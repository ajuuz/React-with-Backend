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
import UserLoginAuth from './Components/Private/UserLoginAuth';
import UserAuth from './Components/Private/userAuth';
import NotFound from './Pages/NotFound/NotFound';
const App = () => {
  return (
    <Router>
      <Routes>
      {/* user sign in and sign up */}
        <Route path='user/signin' element={<UserLoginAuth><UserSignIn/></UserLoginAuth>}/>
        <Route path='user/signup' element={<UserLoginAuth><UserSignUp/></UserLoginAuth>}/>

        {/* user after signin */}
        <Route path='/' element={<UserAuth><Home/></UserAuth>}/>
        <Route path='about' element={<UserAuth><About/></UserAuth>}/>
        <Route path='user/profile' element={<UserAuth><UserProfile/></UserAuth>}/>

        {/* admin sign in */}
        <Route path='admin/signin' element={<AdminSignIn/>}/>

        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App;
