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
        <Link to='/auth/user/signup'><li className='font-semibold'>SignUp</li></Link>
        <Link to='/auth/user/signin'><li className='font-semibold'>signin</li></Link>
       
        </div>
      </ul>
    </div>
  )
}

export default Header
