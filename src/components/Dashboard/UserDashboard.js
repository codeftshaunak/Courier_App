import BASE_URL from '@/public/config';
import axios from 'axios';
import React, { useState } from 'react'

const UserDashboard = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [userData, setUserData] = useState([]);
    console.log(userData);

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

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md flex justify-center items-center">
                <div className="mb-4 items-center">
                    <label htmlFor="startDate" className="block mr-2 font-medium text-gray-700">Start Date:</label>
                    <input
                        type="text"
                        id="startDate"
                        defaultValue={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="h-9 px-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2">
                    Search
                </button>
            </form>
            <br />
        </div>
    )
}

export default UserDashboard;
