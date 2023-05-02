import { LockClosedIcon } from '@heroicons/react/20/solid'
import LayoutComponent from '../layout/LayoutComponent'
import { Typography } from "@material-tailwind/react";
export default function SignUp() {
    return (
        <>
            <LayoutComponent>
                <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                Create a new account                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">

                            </p>
                        </div>
                        <form className="mt-8 space-y-6" action="#" method="POST">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="first-name" className="sr-only">
                                        First Name
                                    </label>
                                    <input
                                        id="first-name"
                                        name="firstname"
                                        type="text"
                                        autoComplete="firstname"
                                        required
                                        className="relative block w-full rounded-t-md border-0 py-2 px-1.5 text-white text-sm"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className='p-1.5'></div>

                                <div>
                                    <label htmlFor="last-name" className="sr-only">
                                        Last Name
                                    </label>
                                    <input
                                        id="last-name"
                                        name="lastname"
                                        type="text"
                                        autoComplete="lastname"
                                        required
                                        className="relative block w-full rounded-t-md border-0 py-2 px-1.5 text-white text-sm"
                                        placeholder="Last Name"
                                    />
                                </div>
                                <div className='p-1.5'></div>

                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="relative block w-full rounded-t-md border-0 py-2 px-1.5 text-white text-sm"
                                        placeholder="Email address"
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
                                        className="relative block w-full rounded-b-md border-0 py-2 px-1.5 text-white text-sm"
                                        placeholder="Password"
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
                                        className="relative block w-full rounded-b-md border-0 py-2 px-1.5 text-white text-sm"
                                        placeholder="Repeat Password"
                                    />
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
                                        By clicking sign up for Free, you agree to Courier's Tearms & Conditions and Privicy Policy.
                                    </label>
                                </div>
                            </div>
                            <div className="text-sm text-right">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
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
                                <Typography variant="small" className="mt-6 flex justify-center text-gray-500">
                                    Already have an account?
                                    <Typography
                                        as="a"
                                        href="/signin"
                                        variant="small"
                                        color="blue"
                                        className="ml-1 font-bold text-blue-500"
                                    >
                                        Sign In
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
