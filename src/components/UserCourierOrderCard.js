import { RiseComplaint } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";
import "tailwindcss/tailwind.css";

const riseComplaint = (awb_number) => {
    const fetchData = async () => {
        const data = await RiseComplaint(awb_number);
        alert(data?.success)
    }
    fetchData();
}


const UserCourierOrderCard = ({ data }) => {
    const router = useRouter();
    const editData = (id) => {
        router.push(`/userorders/${id}`);
    }
    const { order_type, awb_number, status, delivery_date, shipment_date } = data;
    return (
        <tr className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {order_type}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {awb_number}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {status}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {delivery_date}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {shipment_date}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center" onClick={() => riseComplaint(awb_number)}>
                    Rise Complaint
                </button>
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center" onClick={() => editData(awb_number)}>
                    Edit
                </button>
            </th>
        </tr>
    );
};

export default UserCourierOrderCard;