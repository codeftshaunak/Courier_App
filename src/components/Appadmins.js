import React, { useEffect, useState } from "react";
import BASE_URL from "@/public/config";
import { useRouter } from "next/router";
import AdminDashboard from "./AdminDashboard";
import { appAdminsOrder } from "@/utils/api";
import axios from "axios";

const Appadmins = () => {
    const [orderData, setOrderData] = useState([]);
    const [orderType, setOrderType] = useState('');
    const [orderAwbNumber, setOrderAwbNumber] = useState('');
    const [orderCourierCompany, setOrderCourierCompany] = useState('');
    const [orderCourierStatus, setOrderCourierStatus] = useState('');
    const router = useRouter();

    const handleChange = (event) => {
        const { value } = event.target;
        setOrderCourierStatus(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem('accessToken'); // Replace with your actual access token

            const params = {};

            if (orderType) {
                params['order_type'] = orderType;
            }

            if (orderAwbNumber) {
                params['awb_number'] = orderAwbNumber;
            }

            if (orderCourierCompany) {
                params['courier_company'] = orderCourierCompany;
            }

            if (orderCourierStatus) {
                params['status'] = orderCourierStatus;
            }

            const response = await axios.get(`${BASE_URL}/appadmins/orders/`, {
                params,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setOrderData(response.data.results);
        } catch (error) {
            console.log(error)
        }
    };

    //Clear Search
    const clearSearch=(e)=>{
        setOrderAwbNumber('');
        setOrderCourierCompany('');
        setOrderCourierStatus('');
        setOrderType('');
        handleSubmit(e);
    }

    //Csv Download
    const csvDownload = async (e) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem('accessToken'); // Replace with your actual access token

            const params = {};

            if (orderType) {
                params['order_type'] = orderType;
            }

            if (orderAwbNumber) {
                params['awb_number'] = orderAwbNumber;
            }

            if (orderCourierCompany) {
                params['courier_company'] = orderCourierCompany;
            }

            if (orderCourierStatus) {
                params['status'] = orderCourierStatus;
            }

            const queryString = new URLSearchParams(params).toString();


            const response = await axios.get(`${BASE_URL}/appadmins/api/orders/csv-download/?${queryString}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                responseType: 'blob',
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
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    };

    const handleEdit = (id) => {
        router.push(`/appadmins/${id}`);
    }

    const handleChangeType = (event) => {
        const { value } = event.target;
        setOrderType(value)
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await appAdminsOrder();
            setOrderData(data.results);
        };
        fetchData();
    }, []);

    return (
        <AdminDashboard>
            <div className='flex justify-around flex-col'>
                <form onSubmit={handleSubmit} className="mx-auto p-4 bg-white shadow-md rounded-md flex justify-center items-center">
                    <div className="mb-4">
                        <label htmlFor="orderCourierStatus" className="block mb-2 font-medium text-gray-700">Order Type:</label>
                        <select name="order_type" id="status" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleChangeType}
                        >
                            <option value="logistics">Logistics</option>
                            <option value="third_party">Third Party</option>
                        </select>
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
                        <select name="status" id="status" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                        >
                            <option value="preparing">Preparing</option>
                            <option value="manifested">Manifested</option>
                            <option value="in_transit">In Transit</option>
                            <option value="out_for_delivery">Out of Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <button type="submit" className="w-auto h-7 px-5 py-5 items-center flex justify-center text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 ml-3">
                        Search
                    </button>
                    <button onClick={(e)=>clearSearch(e)} className="w-auto h-7 px-5 py-5 items-center flex justify-center text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 ml-3">
                        Clear
                    </button>
                </form>
                <button onClick={(e) => csvDownload(e)} className="w-auto h-7 px-5 py-5 items-center flex justify-center text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 ml-3">
                    Download Csv
                </button>
                <br />

                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope='col' className='text-center px-6 py-3'>
                                    Order Type
                                </th>
                                <th scope='col' className='text-center px-6 py-3'>
                                    Awb number
                                </th>
                                <th scope='col' className='text-center px-6 py-3'>
                                    destination
                                </th>
                                <th scope='col' className='text-center px-6 py-3'>
                                    Courier Company
                                </th>
                                <th scope='col' className='text-center px-6 py-3'>
                                    Status
                                </th>
                                <th scope='col' className='text-center px-6 py-3'>
                                    Update
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData?.map((data) => (
                                <tr key={data.awb_number} className='bg-gray-100 dark:bg-gray-700 dark:text-gray-400 font-bold'>
                                    <td className="text-center py-3 text-white">{data.order_type}</td>
                                    <td className="text-center py-3 text-white">{data.awb_number}</td>
                                    <td className="text-center py-3 text-white">{data.destination}</td>
                                    <td className="text-center py-3 text-white">{data.courier_company}</td>
                                    <td className="text-center py-3 text-white">{data.status}</td>
                                    <td className="text-center py-3 text-white">
                                        <button
                                            onClick={() => handleEdit(data.awb_number)}
                                            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded focus:outline-none"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </AdminDashboard >
    );
};

export default Appadmins;
