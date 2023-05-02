import React from 'react'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';


const LayoutComponent = ({ children }) => {
    return (
        <div className="bg-white h-screen">
            <Navbar />
            <div>
                {children}
            </div>
        </div>
    )
}

export default LayoutComponent;
