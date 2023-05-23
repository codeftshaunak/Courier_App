import React, { Fragment, useEffect, useRef, useState } from 'react'
import AppadminLayout from './Dashboard/AppadminLayout';
import { customerList } from '@/utils/api';
import BASE_URL from '@/public/config';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
// import { Dialog, Transition } from '@headlessui/react';
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';


// export const CustomerFilter = ({
//     placeholder,
//     searchKey,
//     onEnter,
//     setSearchValue,
// }) => {
//     const [searchValueLocal, setSearchValueLocal] = useState("");

//     const handleKeyPress = async (event) => {
//         if (event.key === "Enter") {
//             await onEnter(searchKey, searchValueLocal);
//             setSearchValueLocal("");
//         }
//     };

//     const handleChange = (event) => {
//         const { value } = event.target;
//         setSearchValueLocal(value);
//         setSearchValue(value);
//     };

//     return (
//         <>
//             <input
//                 type='text'
//                 className='p-2 mt-2'
//                 placeholder={placeholder}
//                 value={searchValueLocal}
//                 onChange={handleChange}
//                 onKeyPress={handleKeyPress}
//             />
//         </>
//     );
// };


const Coustomer = () => {
    const [coustomers, setCoustomers] = useState([]);
    // console.log(coustomers);
    // const [searchKey, setSearchKey] = useState("");
    // const [searchValue, setSearchValue] = useState("");

    //Create Or Upload Csv File
    const [open, setOpen] = useState(false);
    // const [opencsv, setOpencsv] = useState(false);
    const cancelButtonRef = useRef(null);
    const router = useRouter();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address_nos: '',
        address_line1: '',
        address_line2: '',
        address_line3: '',
        address_pincode: '',
        GST_nos: '',
        company_name: '',
        email: '',
        mobile_number: '',
    });

    //Upload Photo and Id
    const [photo, setPhoto] = useState(null);
    const handlePhoto = (event) => {
        setPhoto(event.target.files[0])
    }
    const [id, setId] = useState(null);
    const handleId = (event) => {
        setId(event.target.files[0])
    }

    //Final Search 
    const [courierCompany, setCourierCompany] = useState('');
    const [idname, setIdname] = useState('');
    const [usersname, setUsersname] = useState('');


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //Upload Csv File
    // const [file, setFile] = useState(null);
    // const handleFileChangeCsv = (event) => {
    //     setFile(event.target.files[0]);
    // };

    useEffect(() => {
        const fetchData = async () => {
            const data = await customerList();
            setCoustomers(data.results)
        };
        fetchData();
    }, []);

    // const appAdminsOrder = async () => {
    //     const accessToken = localStorage.getItem("accessToken");
    //     try {
    //         const response = await fetch(
    //             `${BASE_URL}/appadmins/customers/?${searchKey}=${searchValue}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             }
    //         );
    //         const data = await response.json();
    //         setCoustomers(data.results);
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


    //Handle Edit Customer
    const handleEdit = (id) => {
        router.push(`/coustomers/${id}`);
    }

    //Handle Submit Filter
    const handleSubmitFilter = async (e) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem('accessToken'); // Replace with your actual access token

            const params = {};

            if (company_name) {
                params['company_name'] = courierCompany;
            }

            if (id) {
                params['id'] = idname;
            }

            if (usersname) {
                params['username'] = usersname;
            }

            const response = await axios.get(`${BASE_URL}/appadmins/customers/`, {
                params,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setCoustomers(response.data.results);
        } catch (error) {
            console.log(error)
        }
    };


    //Upload CSV file 
    // const handleSubmitcsv = async (event) => {
    //     event.preventDefault();
    //     const formDataObj = new FormData();
    //     formDataObj.append("file", file);

    //     const authToken = localStorage.getItem("accessToken");
    //     const response = await fetch(`${BASE_URL}/appadmins/upload-accounts/`, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             Authorization: `Bearer ${authToken}`,
    //         },
    //         body: formDataObj
    //     });
    //     console.log(response);
    // }

    // When It Create New Account
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append('awb_number', formData.awb_number);
        formDataObj.append('amount', formData.amount);
        const authToken = localStorage.getItem("accessToken");
        const response = await fetch(`${BASE_URL}/appadmins/api/accounts/create/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: formDataObj
        });
        console.log(formDataObj);

        const responseData = await response.json();
        alert(responseData.message);
    }

    return (
        <AppadminLayout>
            {/* <div className="mt-2.5">
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
            </div> */}
            <form onSubmit={handleSubmitFilter} className="mx-auto p-4 bg-white shadow-md rounded-md flex items-center justify-center text-center">
                <div className="mb-4">
                    <label htmlFor="orderType" className="block mb-2 font-medium text-gray-700">Courier Company:</label>
                    <input
                        type="text"
                        id="company_name"
                        defaultValue={courierCompany}
                        onChange={(e) => setCourierCompany(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="orderAwbNumber" className="block mb-2 font-medium text-gray-700">Id:</label>
                    <input
                        type="text"
                        id="id"
                        defaultValue={idname}
                        onChange={(e) => setIdname(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="orderCourierCompany" className="block mb-2 font-medium text-gray-700">Username:</label>
                    <input
                        type="text"
                        id="username"
                        defaultValue={usersname}
                        onChange={(e) => setUsersname(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-auto h-7 px-5 items-center flex justify-center text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 ml-3">
                    Search
                </button>
            </form>

            <br />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
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
                            console.log(user.id);
                            return (
                                <tr className="bg-white dark:bg-gray-800" key={user.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.first_name} {user.last_name}
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
            <br />
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
                                                    Create New Acount
                                                </Dialog.Title>
                                                <div>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                First Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="first_name"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                defaultValue={formData.first_name} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Last Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="amount"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                defaultValue={formData.last_name} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Address No
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="address_nos"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                defaultValue={formData.address_nos} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Address Line 01
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="address_line1"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                defaultValue={formData.address_line1} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Address Line 02
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="address_line2"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                defaultValue={formData.address_line2} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Address Line 03
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="address_line3"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                defaultValue={formData.address_line3} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Address Pincode
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="address_pincode"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                defaultValue={formData.address_pincode} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                GST No
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="GST_nos"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                defaultValue={formData.GST_nos} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Company Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="company_name"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                defaultValue={formData.company_name} onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Email
                                                            </label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                defaultValue={formData.email} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Mobile Number
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="mobile_number"
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                defaultValue={formData.mobile_number} onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Your Photo
                                                            </label>
                                                            <input
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                type="file" name="Photo" onChange={handlePhoto}
                                                            />
                                                        </div>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Your Idcard
                                                            </label>
                                                            <input
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                type="file" name="ID_proof" onChange={handleId}
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

            {/* <Transition.Root show={opencsv} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpencsv}>
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
                                                    <form onSubmit={handleSubmitcsv}>
                                                        <h1 className='text-center text-black'>OR</h1>
                                                        <div className="mt-2.5">
                                                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                Upload CSV file:
                                                            </label>
                                                            <input
                                                                autoComplete="given-name"
                                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                type="file" name="file" onChange={handleFileChangeCsv}
                                                            />
                                                        </div>
                                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                            <button
                                                                type="submit"
                                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                                onClick={() => setOpencsv(false)}
                                                            >
                                                                Submit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                onClick={() => setOpencsv(false)}
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
            </Transition.Root> */}

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setOpen(true)}>
                Create Account
            </button>
            {/* <br />
            <br />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setOpencsv(true)}>
                Upload CSV
            </button> */}
        </AppadminLayout>
    )
}

export default Coustomer;
