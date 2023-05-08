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


    // const resolveComplaint = (data) => {
    //     const awb_number = data.order[0].awb_number;
    //     const fetchData = async () => {
    //         const data = await resolveComplaint(awb_number);
    //         console.log(data);
    //     }
    //     fetchData();
    // }

    // const resolveComplaint = (awb_number) => {
    //     const fetchData = async () => {
    //         const data = await ResolveComplaint(awb_number);
    //         alert(data.status);
    //     }
    //     fetchData();
    // }


    // console.log(userAccount);

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
                        {/* <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Complain Resolve
                        </th> */}
                    </tr>
                </thead>
                <tbody>

                    {
                        userAccount?.map((data) => {
                            const awb_number = data.order[0].awb_number;
                            return <tr class="bg-white dark:bg-gray-800">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.amount ? data.amount : "No Amount"}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.complaint_issued ? "Yes" : "No"}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.complaint_issued ? data.complaint_issuser[0].first_name : "No One Complaint"}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.complaint_resolver}
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

export default UserAccounts;
