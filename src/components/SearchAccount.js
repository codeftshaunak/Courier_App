import BASE_URL from '@/public/config';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const SearchAccount = () => {
    const [orderType, setOrderType] = useState('');
    const [orderAwbNumber, setOrderAwbNumber] = useState('');
    const [orderCourierCompany, setOrderCourierCompany] = useState('');
    const [orderCourierStatus, setOrderCourierStatus] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    console.log(searchResults);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem('accessToken'); // Replace with your actual access token

            const params = {};

            if (orderType) {
                params['order__order_type'] = orderType;
            }

            if (orderAwbNumber) {
                params['order__awb_number'] = orderAwbNumber;
            }

            if (orderCourierCompany) {
                params['order__courier_company'] = orderCourierCompany;
            }

            if (orderCourierStatus) {
                params['order__status'] = orderCourierStatus;
            }

            const response = await axios.get(`${BASE_URL}/users/api/accounts/`, {
                params,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setSearchResults(response.data);
        } catch (error) {
            console.log(error.response.data)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="orderType">Order Type:</label>
                <input
                    type="text"
                    id="orderType"
                    defaultValue={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="orderStatus">Order Awb Number:</label>
                <input
                    type="text"
                    id="orderStatus"
                    defaultValue={orderAwbNumber}
                    onChange={(e) => setOrderAwbNumber(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="orderStatus">Order Courier Company:</label>
                <input
                    type="text"
                    id="orderStatus"
                    defaultValue={orderCourierCompany}
                    onChange={(e) => setOrderCourierCompany(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="orderStatus">Order Status:</label>
                <input
                    type="text"
                    id="orderStatus"
                    defaultValue={orderCourierStatus}
                    onChange={(e) => setOrderCourierStatus(e.target.value)}
                />
            </div>
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchAccount;
