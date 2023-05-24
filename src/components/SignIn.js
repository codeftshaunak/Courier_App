import { LockClosedIcon } from '@heroicons/react/20/solid'
import LayoutComponent from '../layout/LayoutComponent'
import { Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '@/utils/api';
import { getToken } from 'firebase/messaging';
import { messaging } from '@/utils/firebase';
import BASE_URL from '@/public/config';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);


    const [formData, setFormData] = useState({
        email_or_mobile: '',
        password: '',
        confirm_password: '',
        otp: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const { email_or_mobile, password, confirm_password, otp } = formData;
            const response = await axios.post(`${BASE_URL}/users/reset/confirm/`, {
                email_or_mobile,
                password,
                confirm_password,
                otp,
            });
            const { detail } = response.data;
            setOpen(false);
            alert(detail);
            router.push('/adminhome');

            // Perform any additional actions with the response data if needed
        } catch (error) {
            // Handle errors here
            console.error('Verification failed:', error);
            alert("Failed To Verified")
            setOpen(false)
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await signIn(username, password);

            // Store the access token in localStorage
            localStorage.setItem('accessToken', response.access);

            // Optionally, store the refresh token as well
            localStorage.setItem('refreshToken', response.refresh);
            alert('Sign-in successful');

            // Navigate to the home page after successful login
            router.push('/');
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
                                                        Fill The Details
                                                    </Dialog.Title>
                                                    <div>
                                                        <form onSubmit={handleVerify}>
                                                            <div className="mt-2.5">
                                                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Your OTP
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="otp"
                                                                    id="mobile number"
                                                                    autoComplete="given-name"
                                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                    value={formData.otp} onChange={handleChange}
                                                                />
                                                            </div>
                                                            <div className="mt-2.5">
                                                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Email/Mobile
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="email_or_mobile"
                                                                    id="mobile number"
                                                                    autoComplete="given-name"
                                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                    value={formData.email_or_mobile} onChange={handleChange}
                                                                />
                                                            </div>
                                                            <div className="mt-2.5">
                                                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Password
                                                                </label>
                                                                <input
                                                                    type="password"
                                                                    name="password"
                                                                    id="mobile number"
                                                                    autoComplete="given-name"
                                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                    value={formData.password} onChange={handleChange}
                                                                />
                                                            </div>
                                                            <div className="mt-2.5">
                                                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                                                    Confirm Password
                                                                </label>
                                                                <input
                                                                    type="password"
                                                                    name="confirm_password"
                                                                    id="mobile number"
                                                                    autoComplete="given-name"
                                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-100"
                                                                    value={formData.confirm_password} onChange={handleChange}
                                                                />
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                <button
                                                                    type="submit"
                                                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
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
                <br />
                <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">

                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email-address"
                                        name="username"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="relative block w-full rounded-t-md border-px py-2 px-1.5 text-black bg-white"
                                        placeholder="User Name"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className='p-1.5'></div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="relative block w-full rounded-t-md border-px py-2 px-1.5 text-black bg-white"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => setOpen(true)}>
                                        Forgot your password?
                                    </a>
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
                                    Sign in
                                </button>
                                <Typography variant="small" className="mt-6 flex justify-center text-gray-500">
                                    Don't have an account?
                                    <Typography
                                        as="a"
                                        href="/signup"
                                        variant="small"
                                        color="blue"
                                        className="ml-1 font-bold text-blue-500"
                                    >
                                        Sign up
                                    </Typography>
                                </Typography>
                            </div>
                        </form>
                    </div>
                </div>
            </LayoutComponent>
        </>

    )
}
