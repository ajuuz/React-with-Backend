import React from 'react'

// for routing
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

// components
import AuthComponenet from './Components/AuthComponents/AuthComponet';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='auth/user/login' element={<AuthComponenet auth="USER LOGIN"/>}/>
        <Route path='auth/user/signup' element={<AuthComponenet auth="USER SIGNUP"/>}/>
        <Route path='auth/admin/login' element={<AuthComponenet auth="ADMIN LOGIN"/>}/>
      </Routes>
    </Router>
  )
}

export default App;
