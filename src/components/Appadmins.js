import React, { useEffect, useState } from "react";
import BASE_URL from "@/public/config";
import { useRouter } from "next/router";
import AdminDashboard from "./AdminDashboard";
import { appAdminsOrder } from "@/utils/api";
import axios from "axios";
// import AppadminsFilter from './AppadminsFilter';

export const AppadminsFilter = ({
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
                type="text"
                className="p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
                value={searchValueLocal}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
        </>
    );
};

const Appadmins = () => {
    const [orderData, setOrderData] = useState([]);
    // const [searchKey, setSearchKey] = useState("");
    // const [searchValue, setSearchValue] = useState("");
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

    const downloadCsv = async (e) => {
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
                params['order__status'] = orderCourierStatus;
            }
            const queryString = new URLSearchParams(params).toString();

            const response = await axios.get(`${BASE_URL}/appadmins/api/orders/csv-download/?${queryString}`, {
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

    // const appAdminsOrder = async () => {
    //     const accessToken = localStorage.getItem("accessToken");
    //     try {
    //         const response = await fetch(
    //             `${BASE_URL}/appadmins/orders/?${searchKey}=${searchValue}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             }
    //         );
    //         const data = await response.json();
    //         setOrderData(data.results);
    //         return data;
    //     } catch (error) {
    //         return console.log(error);
    //     }
    // };

    // const handleEnter = (searchKey) => {
    //     setSearchKey(searchKey);
    //     appAdminsOrder();
    //     setSearchValue("");
    // };

    // const setReset = () => {
    //     setSearchKey("");
    //     setSearchValue("");
    //     appAdminsOrder();
    // };

    const handleEdit = (id) => {
        router.push(`/appadmins/${id}`);
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
                        <select name="status" id="status" className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
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
                    <button type="submit" className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Search
                    </button>
                </form>
                <br />
                {/* <div className='flex justify-around flex-wrap'>
                    <AppadminsFilter
                        placeholder='Courier Company'
                        searchKey='courier_company'
                        onEnter={handleEnter}
                        setSearchValue={setSearchValue}
                    />
                    <AppadminsFilter
                        placeholder='AWB Number'
                        searchKey='awb_number'
                        onEnter={handleEnter}
                        setSearchValue={setSearchValue}
                    />
                    <AppadminsFilter
                        placeholder='Delivery Date'
                        searchKey='delivery_date'
                        onEnter={handleEnter}
                        setSearchValue={setSearchValue}
                    />
                    <AppadminsFilter
                        placeholder='Destination Pincode'
                        searchKey='destination_pincode'
                        onEnter={handleEnter}
                        setSearchValue={setSearchValue}
                    />
                    <AppadminsFilter
                        placeholder='Order Type'
                        searchKey='order_type'
                        onEnter={handleEnter}
                        setSearchValue={setSearchValue}
                    />
                    <AppadminsFilter
                        placeholder='Status'
                        searchKey='status'
                        onEnter={handleEnter}
                        setSearchValue={setSearchValue}
                    />
                    <AppadminsFilter
                        placeholder='Username'
                        searchKey='user'
                        onEnter={handleEnter}
                        setSearchValue={setSearchValue}
                    />
                </div>
                <button onClick={setReset}>Reset</button> */}

                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope='col' className='text-center px-6 py-3 rounded-r-lg'>
                                    Order Type
                                </th>
                                <th scope='col' className='text-center px-6 py-3 rounded-r-lg'>
                                    Awb number
                                </th>
                                <th scope='col' className='text-center px-6 py-3 rounded-r-lg'>
                                    destination
                                </th>
                                <th scope='col' className='text-center px-6 py-3 rounded-r-lg'>
                                    Courier Company
                                </th>
                                <th scope='col' className='text-center px-6 py-3 rounded-r-lg'>
                                    Status
                                </th>
                                <th scope='col' className='text-center px-6 py-3 rounded-r-lg'>
                                    Update
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData?.map((data) => {
                                return <>
                                    <tr key={data.awb_number}>
                                        <th className="text-center">{data.order_type}</th>
                                        <th className="text-center">{data.awb_number}</th>
                                        <th className="text-center">{data.destination}</th>
                                        <th className="text-center">{data.courier_company}</th>
                                        <th className="text-center">{data.status}</th>
                                        <button onClick={() => handleEdit(data.awb_number)} className="text-center">Edit</button>
                                    </tr>
                                </>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminDashboard >
    );
};

export default Appadmins;
