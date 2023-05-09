import React, { useEffect, useState } from 'react'
import AppadminLayout from './Dashboard/AppadminLayout';
import { usersList } from '@/utils/api';

const Coustomer = () => {
    const [coustomers, setCoustomers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await usersList();
            setCoustomers(data.results)
        };
        fetchData();
    }, []);

    return (
        <AppadminLayout>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 rounded-r-lg">
                            User Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Company Name
                        </th>
                        <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3 rounded-r-lg">
                            Verified
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        coustomers?.map((user) => {
                            console.log(user);
                            return (
                                <tr class="bg-white dark:bg-gray-800">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.first_name ? `${user.first_name} '' ${user.last_name}` : "Dummy User"}
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.company_name}
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.is_active ? "Active" : "Not Active"}
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.is_verified ? "Verified" : "Not Verified"}
                                    </th>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </AppadminLayout>
    )
}

export default Coustomer;
