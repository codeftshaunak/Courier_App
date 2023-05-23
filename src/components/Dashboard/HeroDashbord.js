import { useEffect, useState } from "react";

export default function HeroDashbord({ userData }) {
    const [accountList, setAccountList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [complaintsList, setComplaintsList] = useState([]);
    const [orderStatus, setOrderStatus] = useState([]);

    console.log(accountList);
    useEffect(() => {
        setAccountList(userData?.accounts);
        setOrderList(userData?.orders);
        setComplaintsList(userData?.complaints);
        setOrderStatus(userData?.orders_status);
    }, [userData])
    console.log(userData);
    return (
        <div>
            <div className="h-full flex flex-col py-5">
                <div className="bg-gray-200 flex-grow p-5">
                    {/* Top section (full width) */}
                    <h1 className="text-black px-5">Order Status</h1>
                    <div className="item flex px-5 ml-2">
                        {orderStatus?.map((orderstatus) => {
                            return <div className="flex p-5 m-5 capitalize shadow-md bg-white rounded-lg flex-col">
                                <span className="text-black text-center">{orderstatus.status_count}</span>
                                <h1 className="text-black">{orderstatus.status}</h1>
                            </div>
                        })}
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/2 bg-gray-300 text-black p-5">
                        <h2>Account List</h2>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Awb Number
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountList?.map((account) => (
                                    <tr key={account.awb_number} className="bg-white dark:bg-gray-800">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {account?.amount}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {account?.awb_number}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-1/2 bg-gray-300 text-black p-5">
                        <h2>Orders List</h2>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Order Type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Awb Number
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList?.map((order) => (
                                    <tr key={order.awb_number} className="bg-white dark:bg-gray-800">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {order?.order_type}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {order?.awb_number}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="h-full bg-gray-400 w-full">
                    <div className="bg-gray-300 text-black p-5">
                        <h1 className="text-black">Complaint List</h1>
                        <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Complaint Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Awb Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Courier Company
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {complaintsList?.map((complain) => (
                                    <tr key={complain.id} className="bg-white dark:bg-gray-800">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {complain.id}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {complain?.order[0].awb_number}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {complain?.order[0].courier_company}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div >
    )
}


