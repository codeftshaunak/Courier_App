import React, { useEffect, useState } from "react";
import BASE_URL from "@/public/config";
import { useRouter } from "next/router";
import AdminDashboard from "./AdminDashboard";
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
                type='text'
                className='p-2 mt-2'
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
    const [searchKey, setSearchKey] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const appAdminsOrder = async () => {
        const accessToken = localStorage.getItem("accessToken");
        try {
            setLoading(true);
            const response = await fetch(
                `${BASE_URL}/appadmins/orders/?${searchKey}=${searchValue}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const data = await response.json();
            setOrderData(data.results);
            setLoading(false);
            return data;
        } catch (error) {
            return console.log(error);
        }
    };

    const handleEnter = (searchKey) => {
        setSearchKey(searchKey);
        appAdminsOrder();
        setSearchValue("");
    };

    const setReset = () => {
        setSearchKey("");
        setSearchValue("");
        appAdminsOrder();
    };

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
                <div className='flex justify-around flex-wrap'>
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
                <button onClick={setReset}>Reset</button>

                <div class='relative overflow-x-auto'>
                    <table class='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead class='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400'>
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
        </AdminDashboard>
    );
};

export default Appadmins;
