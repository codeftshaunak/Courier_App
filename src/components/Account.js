import { ResolveComplaint, resolveComplaint, accounts, usersList } from '@/utils/api';
import React, { useEffect, useState } from 'react'
import Layout from './Dashboard/Layout';
import BASE_URL from '@/public/config';
import axios from 'axios';
import AppadminLayout from './Dashboard/AppadminLayout';
import CreateAccount from './CreateAccount';

const Account = () => {
    const [account, setAccount] = useState([]);
    const [orderType, setOrderType] = useState('');
    const [orderAwbNumber, setOrderAwbNumber] = useState('');
    const [orderCourierCompany, setOrderCourierCompany] = useState('');
    const [orderCourierStatus, setOrderCourierStatus] = useState('');
    console.log(orderCourierStatus);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem('accessToken'); // Replace with your actual access token

            const params = {};

            if (orderType) {
                params['order__order_type'] = orderType;
            }

            if (orderAwbNumber) {
                params['order__awb_number'] = orderAwbNumber;
            }

            if (orderCourierCompany) {
                params['order__courier_company'] = orderCourierCompany;
            }

            if (orderCourierStatus) {
                params['order__status'] = orderCourierStatus;
            }

            const response = await axios.get(`${BASE_URL}/appadmins/api/accounts/list`, {
                params,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setAccount(response.data.results);
        } catch (error) {
            console.log(error)
        }
    };

    const downloadCsv = async (e) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem('accessToken'); // Replace with your actual access token

            const params = {};

            if (orderType) {
                params['order__order_type'] = orderType;
            }

            if (orderAwbNumber) {
                params['order__awb_number'] = orderAwbNumber;
            }

            if (orderCourierCompany) {
                params['order__courier_company'] = orderCourierCompany;
            }

            if (orderCourierStatus) {
                params['order__status'] = orderCourierStatus;
            }
            const queryString = new URLSearchParams(params).toString();

            const response = await axios.get(`${BASE_URL}/appadmins/api/accounts/csv-download/?${queryString}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                responseType: 'blob', // Set the response type to blob
            });

            const blob = new Blob([response.data], { type: 'text/csv' });

            // Create a download link
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'data.csv';

            // Programmatically trigger a click event on the download link
            downloadLink.click();

            // Clean up
            URL.revokeObjectURL(downloadLink.href);
            downloadLink.remove();
        } catch (error) {
            console.log(error);
        }

    };

    const handleChangeStatus = (event) => {
        const { value } = event.target;
        setOrderCourierStatus(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await usersList();
            setAccount(data?.results);
        };

        fetchData();
    }, []);


    return (
        <AppadminLayout>
            <CreateAccount />
            <br />
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
                <div className="mb-4">
                    <label htmlFor="orderType" className="block mb-2 font-medium text-gray-700">Order Type:</label>
                    <input
                        type="text"
                        id="orderType"
                        defaultValue={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="orderAwbNumber" className="block mb-2 font-medium text-gray-700">Order AWB Number:</label>
                    <input
                        type="text"
                        id="orderAwbNumber"
                        defaultValue={orderAwbNumber}
                        onChange={(e) => setOrderAwbNumber(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="orderCourierCompany" className="block mb-2 font-medium text-gray-700">Order Courier Company:</label>
                    <input
                        type="text"
                        id="orderCourierCompany"
                        defaultValue={orderCourierCompany}
                        onChange={(e) => setOrderCourierCompany(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="orderCourierStatus" className="block mb-2 font-medium text-gray-700">Order Status:</label>
                    <div className="mb-4">
                        <select name="status" id="status" className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                            onChange={handleChangeStatus}
                        >
                            <option value="preparing">Preparing</option>
                            <option value="manifested">Manifested</option>
                            <option value="in_transit">In Transit</option>
                            <option value="out_for_delivery">Out of Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Search
                </button>
            </form>
            <br />
            <button className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={(e) => downloadCsv(e)}>
                Download CSV
            </button>
            <br />
            <br />
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
                        account?.map((data) => {
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
        </AppadminLayout>
    )
}

export default Account;
