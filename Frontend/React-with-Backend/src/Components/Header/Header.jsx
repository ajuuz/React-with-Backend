import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/user/userSlice';

const Header = () => {
// import dispatch for userLogout
  const dispatch = useDispatch();

  // import useNavigate for navigating after logout
  const navigate = useNavigate()
 async function handleLogout(){
    dispatch(userLogout())
    navigate('/user/signin')
    try{
      const res = await fetch('/api/user/logout')
      const data = await res.json();
      console.log(data)
    }
    catch(error)
    {
      console.log("error catched in logout")
    }
  }
  return (
    <div className='px-16 py-4 bg-slate-400'>
      <ul className='flex justify-between'>
        <div className='flex  justify-around '>
        <Link to='/'><li className='font-extrabold font-serif text-xl'>Auth App</li></Link>
        </div>
        <div className='flex gap-10'>
        <Link to='/about'><li className='font-semibold'>About</li></Link>
        <Link to='/user/profile'><li className='font-semibold'>Profile</li></Link>
        <li onClick={handleLogout} className='font-semibold'>Logout</li>
        </div>
      </ul>
    </div>
  )
}

export default Header
