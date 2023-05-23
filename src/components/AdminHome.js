import React from 'react'
import AppadminLayout from './Dashboard/AppadminLayout'
import HeroDashbord from './Dashboard/HeroDashbord'
import DashboardAmount from './Dashboard/UserDashboard'

const AdminHome = () => {
    return (
        <AppadminLayout>
            <DashboardAmount />
        </AppadminLayout>
    )
}

export default AdminHome
