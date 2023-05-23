import React from 'react'
import Layout from './Dashboard/Layout';
import HeroDashbord from './Dashboard/HeroDashbord';
import DashboardAmount from './Dashboard/UserDashboard';

const Dashboard = () => {
    return (
        <Layout>
            <DashboardAmount />
        </Layout>
    )
}

export default Dashboard;
