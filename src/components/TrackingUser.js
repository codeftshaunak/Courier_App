import React, { Fragment, useRef, useState } from 'react'
import Layout from './Dashboard/Layout';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import BASE_URL from '@/public/config';

const TrackingUser = () => {
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
    const [formData, setFormData] = useState({
        awb_number: '',
        mobile_number: ''
    });

    const [orders, setOrders] = useState([]);

    console.log(orders);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append('awb_number', formData.awb_number);
        formDataObj.append('mobile_number', formData.mobile_number);
        const authToken = localStorage.getItem("accessToken");
        const response = await fetch(`${BASE_URL}/users/tracking/AWB/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: formDataObj
        });
        const responseData = await response.json();
        setOrders([responseData]);
    }

    //Change The Data
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };




    return (
        <Layout>
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
                                                    Track Your Order
                                                </Dialog.Title>
                                                <div>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Awb Number:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="awb_number"
                                                                id="mobile number"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                defaultValue={formData.awb_number} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Mobile Number:
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="mobile_number"
                                                                id="mobile number"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                defaultValue={formData.amount} onChange={handleChange}
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


            <br />
            <br />
            {orders.length ? <>
                <div className="p-5 bg-white text-black text-center">
                    <h2 className='text-black text-center font-bold text-xl'>Status of order:-{formData.awb_number}</h2>
                    <br />
                    <hr />
                    <h2><span className='font-bold'> Estimated Delivery Date:</span> {orders[0].estimated_delivery_date}</h2>
                    <br />
                    <h2><span className='font-bold'>Status: </span>{orders[0].status}</h2>
                    <br />
                    <h2><span className='font-bold'>Destination:</span> {orders[0].destination}</h2>
                    <br />
                    <h2><span className='font-bold'>Return Address:</span> {orders[0].return_address}</h2>
                    <br />
                    {/* <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Order Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Destination
                            </th>
                            <th scope="col" className="px-6 py-3 rounded-r-lg">
                                Courier Company
                            </th>
                            <th scope="col" className="px-6 py-3 rounded-r-lg">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 rounded-r-lg">
                                Shipment Date
                            </th>
                        </tr>
                    </thead> */}
                    {/* <tbody>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {orders.order_type}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {orders.destination}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {orders.courier_company}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {orders.status}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {orders.shipment_date}
                            </th>
                        </tr>


                    </tbody> */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setOpen(true)}>
                        Track Another Order
                    </button>
                </div>
            </> : <><h1>Wanna Track Your Order?</h1> <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setOpen(true)}>
                Start Tracking
            </button></>}

        </Layout>
    )
}

export default TrackingUser;
