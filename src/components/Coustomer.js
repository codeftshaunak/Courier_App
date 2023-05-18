import React, { useEffect, useState } from 'react'
import AppadminLayout from './Dashboard/AppadminLayout';
import { usersList } from '@/utils/api';
import BASE_URL from '@/public/config';
import axios from 'axios';
import { useRouter } from 'next/router';


export const CustomerFilter = ({
    placeholder,
    searchKey,
    onEnter,
    setSearchValue,
}) => {
    const [searchValueLocal, setSearchValueLocal] = useState("");

    const handleKeyPress = async (event) => {
        if (event.key === "Enter") {
            await onEnter(searchKey, searchValueLocal);
            setSearchValueLocal("");
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchValueLocal(value);
        setSearchValue(value);
    };

    return (
        <>
            <input
                type='text'
                className='p-2 mt-2'
                placeholder={placeholder}
                value={searchValueLocal}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
        </>
    );
};


const Coustomer = () => {
    const [coustomers, setCoustomers] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await usersList();
            setCoustomers(data.results)
        };
        fetchData();
    }, []);

    const appAdminsOrder = async () => {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await fetch(
                `${BASE_URL}/appadmins/customers/?${searchKey}=${searchValue}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const data = await response.json();
            setCoustomers(data.results);
            return data;
        } catch (error) {
            return console.log(error);
        }
    };

    const handleEnter = (searchKey) => {
        setSearchKey(searchKey);
        appAdminsOrder();
        setSearchValue("");
    };

    const handleEdit = (id) => {
        router.push(`/coustomers/${id}`);
    }

    return (
        <AppadminLayout>
            <div className="mt-2.5">
                <div className='flex justify-around flex-col'>
                    <div className='flex justify-around flex-wrap'>
                        <CustomerFilter
                            placeholder='Company Name'
                            searchKey='company_name'
                            onEnter={handleEnter}
                            setSearchValue={setSearchValue}
                        />
                        <CustomerFilter
                            placeholder='Username'
                            searchKey='username'
                            onEnter={handleEnter}
                            setSearchValue={setSearchValue}
                        />
                        <CustomerFilter
                            placeholder='User Id'
                            searchKey='id'
                            onEnter={handleEnter}
                            setSearchValue={setSearchValue}
                        />
                    </div>
                </div>
            </div>

            <br />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            User Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Company Name
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Verified
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        coustomers?.map((user) => {
                            return (
                                <tr className="bg-white dark:bg-gray-800" key={user.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.first_name ? `${user.first_name} '' ${user.last_name}` : "Dummy User"}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.company_name}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.is_active ? "Active" : "Not Active"}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.is_verified ? "Verified" : "Not Verified"}
                                    </th>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center" onClick={() => handleEdit(user.id)}>
                                        Edit
                                    </button>
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
