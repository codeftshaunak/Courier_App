import React from 'react'
import './dashbord.module.css'

const HumburgerButton = ({ mobileMenu, setMobileMenu }) => {
    return (
        <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className={`${mobileMenu && 'open'} block hamburger sm:hidden focus:outline-none`}
        >
            <span className='hamburger-top dark:bg-slate-50'></span>
            <span className='hamburger-middle dark:bg-slate-50'></span>
            <span className='hamburger-bottom dark:bg-slate-50'></span>
        </button>
    )
}

export default HumburgerButton;