import BASE_URL from '@/public/config';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import HeroDashbord from './HeroDashbord';
import { useRouter } from 'next/router';


const UserDashboard = () => {
    const router = useRouter();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [userData, setUserData] = useState([]);
    // console.log(userData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem('accessToken'); // Replace with your actual access token

            const params = {};

            if (startDate) {
                params['start_date'] = startDate;
            }

            if (endDate) {
                params['end_date'] = endDate;
            }

            const response = await axios.get(`${BASE_URL}/users/dashboard`, {
                params,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setUserData(response.data);
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
            const getYesterday = () => {
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                return yesterday;
            }

            const todayStart = () => {
                const today = new Date();
                const Today = new Date(today);
                return Today;
            }

            try {
                const accessToken = localStorage.getItem('accessToken'); // Replace with your actual access token

                const params = {};
                let a = 5;

                if (a == 5) {
                    const today = todayStart();
                    const formattedStartDate = formatDate(today);
                    params['end_date'] = formattedStartDate;
                }

                if (a == 5) {
                    const yesterday = getYesterday();
                    const formattedEndDate = formatDate(yesterday);
                    params['start_date'] = formattedEndDate;
                }

                const response = await axios.get(`${BASE_URL}/users/dashboard`, {
                    params,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status === 200) {
                    setUserData(response.data);
                } else if (response.status === 401) {
                    alert("Your Login Time Expire Kindly Login Again");
                    router.push('/signin');

                }

            } catch (error) {
                if (error.response.data.code == 'token_not_valid') {
                    router.push('/signin');
                    // alert("Your Login Time Expire Kindly Login Again");
                }
                console.log(error?.response.data.code)
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            <div className="flex flex-col w-60">
                <button type="submit" className="ml-2 h-9 px-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4" onClick={(e) => alert("API Key Required")}>
                    Create order for delhivery
                </button>
                <button onClick={(e) => alert("API Key Required")} className="ml-2 h-9 px-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4">
                    Edit order for delhivery
                </button>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md flex justify-center items-center">
                <div className="mb-4 items-center">
                    <label htmlFor="startDate" className="block mr-2 font-medium text-gray-700">Start Date:</label>
                    <input
                        type="text"
                        id="startDate"
                        defaultValue={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder='yyyy-mm-dd'
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4 items-center">
                    <label htmlFor="endDate" className="block mr-2 font-medium text-gray-700">End Date:</label>
                    <input
                        type="text"
                        id="endDate"
                        defaultValue={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder='yyyy-mm-dd'
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="h-9 px-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2">
                    Search
                </button>
            </form>
            <br />
            <HeroDashbord userData={userData} />
        </div>
    )
}

export default UserDashboard;
