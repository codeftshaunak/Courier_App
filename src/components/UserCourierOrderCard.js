import { headers } from "@/next.config";
import BASE_URL from "@/public/config";
import { RiseComplaint } from "@/utils/api";
import axios from "axios";
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

const downloadData =async (awb_number) => {
    if (!awb_number) {
        alert("Sorry you can't download this awb number didn't found")
    } else {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(
              `${BASE_URL}/users/barcode-qr-code/${awb_number}/`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                responseType: 'blob', // Set the response type to blob
              }
            );
          
            const blob = new Blob([response.data], { type: 'application/zip' });
          
            // Create a download link
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'data.zip';
          
            // Programmatically trigger a click event on the download link
            downloadLink.click();
          
            // Clean up
            URL.revokeObjectURL(downloadLink.href);
            downloadLink.remove();
          } catch (error) {
            // Handle error
            console.error('Error downloading ZIP file:', error);
          }          
    }

}


const UserCourierOrderCard = ({ data }) => {
    const router = useRouter();
    const editData = (id) => {
        router.push(`/userorders/${id}`);
    }
    const { order_type, awb_number, status, shipment_date } = data;
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
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center" onClick={() => downloadData(awb_number)}>
                    Download
                </button>
            </th>

        </tr>
    );
};

export default UserCourierOrderCard;