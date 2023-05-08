import React, { useState } from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { AiFillPieChart } from 'react-icons/ai'
import { SiFuturelearn } from 'react-icons/si'
import { SiOpenaccess } from 'react-icons/si'
import { CgProfile } from 'react-icons/cg'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import HumburgerButton from './HumburgerMenu/HumburgerButton'


const AppadminSidebar = () => {
    const [open, setOpen] = useState(true)
    const [mobileMenu, setMobileMenu] = useState(false)
    const router = useRouter();

    const Menus = [
        { title: 'Home', path: '/', src: <CgProfile /> },
        { title: 'Appadmins', path: '/appadmins', src: <SiFuturelearn /> },
        { title: 'Adminlogin', path: '/admin', src: <SiOpenaccess />, gap: 'true' },
    ]

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
        </>
    )
}

export default AppadminSidebar;