import React, { useEffect, useState } from 'react'
import Layout from './Dashboard/Layout';
import UserAccounts from './UserAccounts';
import UserCourierOrder from './UserCourierOrder';
import UserComplaints from './UserComplaints';

const User = () => {
    return (
        <Layout>
            <div className="userAccounts">
                <h1>User Accounts</h1>
                {/* <UserAccounts /> */}
            </div>
            <div className="userComplaints">
                <h1>User Complaints</h1>
                <UserComplaints />
            </div>
            <div className="userCourierOrder">
                <h1>User Order Courier</h1>
                <UserCourierOrder />
            </div>
        </Layout>
    )
}

export default User;
