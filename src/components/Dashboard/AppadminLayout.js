import React from 'react'
import Navbar from './DashbordNavbar'
import AppadminSidebar from './AppadminSidebar'

const AppadminLayout = ({ children }) => {
    return (
        <>
            <div className='flex flex-auto h-screen'>
                <AppadminSidebar />
                <div className='grow'>
                    <Navbar />
                    <div className='m-5'>{children}</div>
                </div>
            </div>
        </>
    )
}

export default AppadminLayout;
