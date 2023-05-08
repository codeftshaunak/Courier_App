import React from 'react'
import AppadminLayout from './Dashboard/AppadminLayout';
import HeroDashbord from './Dashboard/HeroDashbord';

function AdminDashboard({ children }) {
    return (
        <AppadminLayout>
            {children}
        </AppadminLayout>
    )
}

export default AdminDashboard;
