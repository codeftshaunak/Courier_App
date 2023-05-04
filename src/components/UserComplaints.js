import { userComplaints } from '@/utils/api';
import React, { useEffect, useState } from 'react'
import Layout from './Dashboard/Layout';

const UserComplaints = () => {
    const [userComplaint, setUserComplaint] = useState([]);
    console.log(userComplaint);
    useEffect(() => {
        const fetchData = async () => {
            const data = await userComplaints();
            setUserComplaint(data.results)
        }
        fetchData()
    }, []);

    return (
        <Layout>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Amount
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Complaint issued
                        </th>
                        <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Complaint Issuser
                        </th>
                        <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Complaint Resolver
                        </th>
                        <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Complainer Status
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        userComplaint?.map((data) => {
                            return <tr class="bg-white dark:bg-gray-800">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.amount}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.complaint_issued ? "Yes" : "No"}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.complaint_issued ? data.complaint_issuser[0].first_name : "No One Complaint"}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.complaint_resolver[0].first_name}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.complaint_issuser[0].is_customer ? "Coustomer" : "Not Coustomer"}
                                </th>
                            </tr>
                        })
                    }
                </tbody>

            </table>




        </Layout>
    )
}

export default UserComplaints;
