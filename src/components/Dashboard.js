import React from 'react'
import Layout from './Dashboard/Layout';
import HeroDashbord from './Dashboard/HeroDashbord';
import DashboardAmount from './Dashboard/DashboardAmount';

const Dashboard = () => {
    return (
        <Layout>
            <HeroDashbord />
            <DashboardAmount />
        </Layout>
    )
}

export default Dashboard;
