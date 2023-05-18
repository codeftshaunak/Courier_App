import { ResolveComplaint, userComplaints } from '@/utils/api';
import React, { useEffect, useState } from 'react'
import Layout from './Dashboard/Layout';

const UserComplaints = () => {
    const [userComplaint, setUserComplaint] = useState([]);
    // console.log(userComplaint);
    useEffect(() => {
        const fetchData = async () => {
            const data = await userComplaints();
            setUserComplaint(data?.results)
        }
        fetchData()
    }, []);

    const resolveComplaint = (awb_number) => {
        const fetchData = async () => {
            const data = await ResolveComplaint(awb_number);
            console.log(data)
        }
        fetchData();
    }

    return (
        <Layout>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Complaint issued
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Complaint Issuser
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Complaint Resolver
                        </th>
                        {/* <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Complainer Status
                        </th> */}
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Resolve Complain
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        userComplaint?.map((data) => {
                            console.log(data);
                            const awb_number = data?.order[0]?.awb_number
                            return <tr className="bg-white dark:bg-gray-800" key={data.order[0].awb_number}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.amount ? data.amount : "No Amount"}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.complaint_issued ? "Yes" : "No"}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.complaint_issued ? data.complaint_issuser[0]?.first_name : "No One Complaint"}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.complaint_resolver}
                                </th>
                                {/* <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.complaint_issuser[0]?.is_customer ? "Coustomer" : "Not Coustomer"}
                                </th> */}
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center" onClick={() => resolveComplaint(awb_number)}>
                                    Resolve Issue
                                </button>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </Layout>
    )
}

export default UserComplaints;
