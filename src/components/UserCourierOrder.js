import { userCourierOrders } from '@/utils/api';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import UserCourierOrderCard from './UserCourierOrderCard';
import Layout from './Dashboard/Layout';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import BASE_URL from '@/public/config';

const UserCourierOrder = () => {
    const [userCourierOrder, setuserCourierOrder] = useState([]);
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null);

    const [formData, setFormData] = useState({
        order_type: '',
        origin: '',
        origin_pincode: '',
        destination: '',
        destination_pincode: '',
        Category: '',
        return_address: '',
        return_address_pincode: ''
    });
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append('order_type', formData.order_type);
        formDataObj.append('origin', formData.origin);
        formDataObj.append('origin_pincode', formData.origin_pincode);
        formDataObj.append('destination', formData.destination);
        formDataObj.append('destination_pincode', formData.destination_pincode);
        formDataObj.append('Category', formData.Category);
        formDataObj.append('return_address', formData.return_address);
        formDataObj.append('return_address_pincode', formData.return_address_pincode);
        formDataObj.append('courier_company', formData.courier_company);
        formDataObj.append('file', file);
        const authToken = localStorage.getItem("accessToken");
        const response = await fetch(`${BASE_URL}/users/api/orders/courier/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: formDataObj
        });
        console.log(formDataObj);

        const responseData = await response.json();
        console.log(responseData);
    };



    useEffect(() => {
        const fetchData = async () => {
            const data = await userCourierOrders();
            console.log(data);
            setuserCourierOrder(data.results);
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Order Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Awb number
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Status
                        </th>
                        {/* <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Delivery date
                        </th> */}
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Shipment date
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Rise Complaint
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">
                            Edit Data
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        userCourierOrder?.map((data) => {
                            return <UserCourierOrderCard key={data.awb_number} data={data} />
                        })
                    }
                </tbody>
            </table>
            <br />

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center" onClick={() => setOpen(true)}>
                Add A New Order
            </button>

            <br />
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Make Your Order
                                                </Dialog.Title>
                                                <div>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Order type:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="order_type"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                value={formData.order_type} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Courier Company:                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="courier_company"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                value={formData.courier_company} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Origin:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="origin"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                value={formData.origin} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Origin Pincode:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="origin_pincode"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                value={formData.origin_pincode} onChange={handleChange} />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Destination:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="destination"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                value={formData.destination} onChange={handleChange} />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Destination Pincode:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="destination_pincode"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                value={formData.destination_pincode} onChange={handleChange} />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Category:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="Category"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                value={formData.Category} onChange={handleChange} />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Return address:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                name="return_address" value={formData.return_address} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Return address Pincode:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                name="return_address_pincode" value={formData.return_address_pincode} onChange={handleChange} />
                                                        </div>
                                                        <h1 className='text-center text-black'>OR</h1>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Upload CSV file:
                                                            </label>
                                                            <input
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                type="file" name="file" onChange={handleFileChange}
                                                            />
                                                        </div>
                                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                            <button
                                                                type="submit"
                                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                                onClick={() => setOpen(false)}
                                                            >
                                                                Submit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                onClick={() => setOpen(false)}
                                                                ref={cancelButtonRef}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </Layout>
    )
}

export default UserCourierOrder
