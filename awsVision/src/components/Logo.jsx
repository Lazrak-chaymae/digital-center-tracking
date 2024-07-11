import React from 'react'
import awbLogo from '../assets/awblogo.png';

const Logo = () => {
  return (
    <div className='logo'>
        <div className='logo-icon'>
             <img src={awbLogo} alt="AWB Logo" />
        </div>
    </div>
  )
}

export default Logo
