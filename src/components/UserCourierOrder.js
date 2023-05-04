import { userCourierOrders } from '@/utils/api';
import React, { useEffect, useState } from 'react'
import UserCourierOrderCard from './UserCourierOrderCard';
import Layout from './Dashboard/Layout';

const UserCourierOrder = () => {
    const [userCourierOrder, setuserCourierOrder] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await userCourierOrders();
            setuserCourierOrder(data.results);
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Order Type
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Awb number
                        </th>
                        <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Delivery date
                        </th>
                        <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Shipment date
                        </th>
                        <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Rise Complaint
                        </th>
                        <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Edit Data
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        userCourierOrder?.map((data) => {
                            return <UserCourierOrderCard key={data.awb_number} data={data} />
                        })
                    }
                </tbody>
            </table>
        </Layout>
    )
}

export default UserCourierOrder
