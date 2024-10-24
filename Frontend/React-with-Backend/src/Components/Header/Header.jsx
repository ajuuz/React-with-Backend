import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='px-16 py-4 bg-slate-400'>
      <ul className='flex justify-between'>
        <div className='flex  justify-around '>
        <Link to='/'><li className='font-extrabold font-serif text-xl'>Auth App</li></Link>
        </div>
        <div className='flex gap-10'>
        <Link to='/about'><li className='font-semibold'>About</li></Link>
        <Link to='/user/profile'><li className='font-semibold'>Profile</li></Link>
        <Link to='/user/logout'><li className='font-semibold'>Logout</li></Link>
        </div>
      </ul>
    </div>
  )
}

export default Header
