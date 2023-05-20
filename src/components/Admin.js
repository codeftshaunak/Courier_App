import { LockClosedIcon } from '@heroicons/react/20/solid'
import LayoutComponent from '../layout/LayoutComponent'
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { adminSignIn } from '@/utils/api';

export default function Admin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await adminSignIn(username, password);
            // Store the access token in localStorage
            localStorage.setItem('accessToken', response.access);

            // Optionally, store the refresh token as well
            localStorage.setItem('refreshToken', response.refresh);

            alert("SignIn Successful");

            // Navigate to the home page after successful login
            router.push('/admindashboard');

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <LayoutComponent>
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
                                        className="relative block w-full rounded-b-md border-px py-2 px-1.5 text-black bg-white"
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
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
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
