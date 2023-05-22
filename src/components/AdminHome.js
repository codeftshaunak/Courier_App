import React from 'react'
import AppadminLayout from './Dashboard/AppadminLayout'
import HeroDashbord from './Dashboard/HeroDashbord'
import DashboardAmount from './Dashboard/UserDashboard'

const AdminHome = () => {
    return (
        <AppadminLayout>
            <HeroDashbord />
            <DashboardAmount />
        </AppadminLayout>
    )
}

export default AdminHome
