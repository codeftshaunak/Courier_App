import React, { useState } from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { AiFillPieChart } from 'react-icons/ai'
import { SiOpenaccess } from 'react-icons/si'
import { CgProfile } from 'react-icons/cg'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import HumburgerButton from './HumburgerMenu/HumburgerButton';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { getMessaging, getToken } from 'firebase/messaging'
import { initializeApp } from 'firebase/app'
import axios from 'axios'
import BASE_URL from '@/public/config'


const Sidebar = () => {
    const [open, setOpen] = useState(true)
    const [mobileMenu, setMobileMenu] = useState(false)
    const router = useRouter();

    const Menus = [
        { title: 'Dashboard', path: '/dashboard', src: <AiFillPieChart /> },
        { title: 'User Account', path: '/useraccount', src: <CgProfile /> },
        { title: 'User Complaint', path: '/usercomplaint', src: <CgProfile /> },
        { title: 'User Orders', path: '/userorders', src: <CgProfile /> },
        // { title: 'Tracking Orders', path: '/trackinguser', src: <CgProfile /> },
        { title: 'Signin', path: '/signin', src: <SiOpenaccess />, gap: 'true' },
    ]



    //Firebase Cloud Messaging
    const firebaseConfig = {
        apiKey: "AIzaSyCIoomfvPM8SRwqAOqYG4sgIyTy_tuWnOQ",
        authDomain: "courier-application-a7d23.firebaseapp.com",
        projectId: "courier-application-a7d23",
        storageBucket: "courier-application-a7d23.appspot.com",
        messagingSenderId: "357303065126",
        appId: "1:357303065126:web:d90fb7c0da1dce41c0e4e7",
        measurementId: "G-RH4VNVLJ45"
    };

    let messaging = null;


    if (typeof window !== 'undefined') {
        // Initialize Firebase only on the client-side
        const app = initializeApp(firebaseConfig);
        messaging = getMessaging(app);
    }

    const handleNotification = async () => {
        const accessToken = localStorage.getItem("accessToken");
        // console.log(accessToken);
        try {
            const token = await getToken(messaging, {
                vapidKey: 'BCVF3M-ob6qMAK9pPprwZOfB31OsWRFtX6srpdXw1Qjr5VRkUhKivBbt6b5cPBxW-uuR-QMXqTmoZGTfVe9ik9k',
            });

            console.log(token);

            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await axios.post(`${BASE_URL}/users/fcm-device/`, { registration_id: token }, config);
            console.log('Token sent successfully:', response.data);
            alert('You will notified');
        } catch (error) {
            console.error('Failed to send token:', error);
        }
    };


    return (
        <>
            <div
                className={`${open ? 'w-60' : 'w-fit'
                    } hidden sm:block relative h-screen duration-300 bg-gray-100 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
            >
                <BsArrowLeftCircle
                    className={`${!open && 'rotate-180'
                        } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
                    onClick={() => setOpen(!open)}
                />
                <br />
                <NextLink href='/'>
                    <div className={`flex ${open && 'gap-x-4'} items-center`}>
                        <img src="" alt='' className='pl-2' />
                        {open && (
                            <span className='text-xl font-medium whitespace-nowrap dark:text-white'>
                                Courier
                            </span>
                        )}
                    </div>
                </NextLink>
                <br />
                <ul className='flex flex-col gap-y-2'>
                    {Menus.map((menu, index) => (
                        <NextLink href={menu.path} key={index}>
                            <li
                                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700
                             ${router.pathname === menu.path ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            >
                                <span className='text-2xl'>{menu.title.charAt(0)}</span>
                                <span className='origin-left duration-300 hover:block'>
                                    {menu.title}
                                </span>
                            </li>
                        </NextLink>
                    ))}
                </ul>
            </div>
            {/* Mobile Menu */}
            <div className="pt-3">
                <HumburgerButton
                    setMobileMenu={setMobileMenu}
                    mobileMenu={mobileMenu}
                />
            </div>
            <div className="sm:hidden">
                <div
                    className={`${mobileMenu ? 'flex' : 'hidden'
                        } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}
                >
                    {Menus.map((menu, index) => (
                        <NextLink href={menu.path} key={index}>
                            <li
                                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700
                             ${router.pathname === menu.path ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                            >
                                <span className='text-2xl'>{menu.title.charAt(0)}</span>
                                <span className='origin-left duration-300 hover:block'>
                                    {menu.title}
                                </span>
                            </li>
                        </NextLink>
                    ))}
                </div>
            </div>

            <div className="notification" onClick={handleNotification}>
                <h1>Get Notified</h1>
                <IoIosNotificationsOutline />
            </div>
        </>
    )
}

export default Sidebar;