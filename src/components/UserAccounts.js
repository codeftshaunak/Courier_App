import { ResolveComplaint, resolveComplaint, userAccounts } from '@/utils/api';
import React, { useEffect, useState } from 'react'
import Layout from './Dashboard/Layout';

const UserAccounts = () => {
    const [userAccount, setUserAccount] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const data = await userAccounts();
            setUserAccount(data?.results);
        };

        fetchData();
    }, []);


    return (
        <Layout>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created At
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Awb number
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userAccount?.map((data) => {
                            const awb_number = data.order[0].awb_number;
                            return <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.amount ? data.amount : "No Amount"}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.created_at}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data?.order[0]?.status}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data?.order[0]?.awb_number}
                                </th>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </Layout>
    )
}

export default UserAccounts;
