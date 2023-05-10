import React, { useEffect, useState } from 'react'
import AppadminLayout from './Dashboard/AppadminLayout';
import { usersList } from '@/utils/api';
import BASE_URL from '@/public/config';
import axios from 'axios';


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

    useEffect(() => {
        const fetchData = async () => {
            const data = await usersList();
            setCoustomers(data.results)
        };
        fetchData();
    }, []);

    // function handleSearch(event) {
    //     event.preventDefault();
    //     const searchId = event.target.elements['search-id'].value;
    //     const url = `${BASE_URL}/appadmins/customers/${searchId}/`;
    //     const accessToken = localStorage.getItem('accessToken');

    //     axios.get(url, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     }).then((response) => {
    //         const data = Array.isArray(response.data) ? response.data : [response.data];
    //         setCoustomers(data);
    //     })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

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

    return (
        <AppadminLayout>
            <div className="mt-2.5">
                {/* <form onSubmit={handleSearch}>
                    <label htmlFor="search-id" className="block text-sm font-semibold leading-6 text-white">
                        Search User By Id
                    </label>
                    <input
                        type="text"
                        name="search-id"
                        id="search-id"
                        autoComplete="off"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                    />
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md mt-2">
                        Search
                    </button>
                </form> */}

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
                            return (
                                <tr class="bg-white dark:bg-gray-800" key={user.id}>
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
