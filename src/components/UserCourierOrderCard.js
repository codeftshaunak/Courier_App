import React from "react";
import "tailwindcss/tailwind.css";

const UserCourierOrderCard = ({ data }) => {
    console.log(data);
    const { order_type, awb_number, status, delivery_date, shipment_date } = data;
    return (
        <tr class="bg-white dark:bg-gray-800">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {order_type}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {awb_number}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {status}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {delivery_date}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {shipment_date}
            </th>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
                Rise Complaint
            </button>

        </tr>
    );
};

export default UserCourierOrderCard;