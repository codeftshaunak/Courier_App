import { LockClosedIcon } from '@heroicons/react/20/solid'
import LayoutComponent from '../layout/LayoutComponent'
import { Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, signUp } from '@/utils/api';
import { getToken } from 'firebase/messaging';
import { messaging } from '@/utils/firebase';
import BASE_URL from '@/public/config';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function SignUp() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile_number, setMobileNumber] = useState('');
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);

    const [verify_email, setVerify_email] = useState(false);
    const [verify_mobile_number, setVerifyMobile] = useState(false);
    useEffect(() => {
        setVerifyMobile(!verify_email)
    }, [verify_email]);

    //For verify
    const [otp, setOtp] = useState('');
    const [verifyemail, setVerifyEmail] = useState('');
    const [verifyMobile, setVerifyMobileNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await signUp(first_name, last_name, email, mobile_number, verify_email, verify_mobile_number);
            // Store the access token in localStorage
            localStorage.setItem('accessToken', response.access);
            // Optionally, store the refresh token as well
            localStorage.setItem('refreshToken', response.refresh);
            setOpen(true)
            alert('Sign Up Successful');

        } catch (error) {
            console.error(error);
            // Display the error message in the frontend
            if (error.response && error.response.data && error.response.data.error) {
                const errorMessage = error.response.data.error;
                alert(`Sign-in failed: ${errorMessage}`);
            } else {
                alert('Sign-in failed. Please try again.');
            }
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            if (verify_email) {
                const response = await axios.post(
                    `${BASE_URL}/users/api/users/verify-otp/`,
                    { otp: otp, email: verifyemail }
                );
                const data = response.data;
                setOpen(false);
                alert(data.detail);
            } else if (verify_mobile_number) {
                const response = await axios.post(
                    `${BASE_URL}/users/api/users/verify-otp/`,
                    { otp: otp, mobile_number: verifyMobile }
                );
                const data = response.data;
                setOpen(false);
                alert(data.detail);
            } else {
                // Handle the case when neither option is selected
                console.log('Please select a verification option');
            }
            // Perform any additional actions with the response data if needed
        } catch (error) {
            // Handle errors here
            console.error('Verification failed:', error);
        }
    };



    return (
        <>
            <LayoutComponent>
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
                                                        Verify Otp
                                                    </Dialog.Title>
                                                    <div>
                                                        <form onSubmit={handleVerify}>
                                                            <div className="mt-2.5">
                                                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Your Otp
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="verify"
                                                                    id="mobile number"
                                                                    autoComplete="given-name"
                                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                    defaultValue={otp} onChange={(e) => setOtp(e.target.value)}
                                                                />
                                                            </div>

                                                            {/* <div className="mt-2.5">
                                                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Mobile Number
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    name="verify"
                                                                    id="mobile number"
                                                                    autoComplete="given-name"
                                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                    defaultValue={verifyMobile} onChange={(e) => setVerifyMobileNumber(e.target.value)}
                                                                />
                                                            </div> */}
                                                            {
                                                                verify_email ? <>
                                                                    <div className="mt-2.5">
                                                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                            Email
                                                                        </label>
                                                                        <input
                                                                            type="email"
                                                                            name="verify"
                                                                            id="mobile number"
                                                                            autoComplete="given-name"
                                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                            defaultValue={verifyemail} onChange={(e) => setVerifyEmail(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </> : <>
                                                                    <div className="mt-2.5">
                                                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                            Mobile Number
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            name="verify"
                                                                            id="mobile number"
                                                                            autoComplete="given-name"
                                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                            defaultValue={verifyMobile} onChange={(e) => setVerifyMobileNumber(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </>
                                                            }

                                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                <button
                                                                    type="submit"
                                                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                                >
                                                                    Verify Now
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
                <br />
                <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="/courierlogo.jpeg"
                                alt="Your Company"
                            />
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                SignUp to your account
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">

                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        First Name
                                    </label>
                                    <input
                                        id="email-address"
                                        name="first_name"
                                        type="text"
                                        autoComplete="first_name"
                                        required
                                        className="relative block w-full rounded-t-md border-px py-2 px-1.5 text-black bg-white"
                                        placeholder="First Name"
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className='p-1.5'></div>
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Last Name
                                    </label>
                                    <input
                                        id="email-address"
                                        name="last_name"
                                        type="text"
                                        autoComplete="last-name"
                                        required
                                        className="relative block w-full rounded-t-md border-px py-2 px-1.5 text-black bg-white"
                                        placeholder="Last Name"
                                        value={last_name}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className='p-1.5'></div>
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Email
                                    </label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="last-name"
                                        required
                                        className="relative block w-full rounded-t-md border-px py-2 px-1.5 text-black bg-white"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='p-1.5'></div>
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Mobile Number
                                    </label>
                                    <input
                                        id="email-address"
                                        name="mobile_number"
                                        type="text"
                                        autoComplete="last-name"
                                        required
                                        className="relative block w-full rounded-t-md border-px py-2 px-1.5 text-black bg-white"
                                        placeholder="Mobile Number"
                                        value={mobile_number}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                    />
                                </div>
                                <div className='p-1.5'></div>
                                <div className="flex items-center">
                                    <input
                                        id="verify-mobile-number"
                                        name="verify_mobile_number"
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        checked={!verify_email}
                                        onChange={() => setVerify_email(false)}
                                    />
                                    <label htmlFor="verify-mobile-number" className="ml-2 block text-sm text-gray-900">
                                        Verify With Number
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="verify-email"
                                        name="verify_email"
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        checked={verify_email}
                                        onChange={() => setVerify_email(true)}
                                    />
                                    <label htmlFor="verify-email" className="ml-2 block text-sm text-gray-900">
                                        Verify With Email
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                    </span>
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </LayoutComponent>
        </>

    )
}
