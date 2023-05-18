import BASE_URL from '@/public/config';
import AppadminLayout from '@/src/components/Dashboard/AppadminLayout';
import Layout from '@/src/components/Dashboard/Layout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const EditUserOrder = () => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState({
        courier_company: '',
        order_type: '',
        destination: '',
        destination_pincode: '',
        return_address: '',
        return_address_pincode: '',
    });

    const [data, setData] = useState([]);

    const { awb_number, courier_company, order_type, destination, destination_pincode, return_address, return_address_pincode } = data;
    console.log(order_type);
    console.log(formData.order_type);
    useEffect(() => {
        formData.courier_company = courier_company,
            formData.order_type = order_type,
            formData.destination = destination,
            formData.destination_pincode = destination_pincode,
            formData.return_address = return_address,
            formData.return_address_pincode = return_address_pincode
    }, [data])

    // Fetch order data on component mount
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        async function fetchData() {
            const res = await fetch(`${BASE_URL}/users/api/orders/update/${id}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const data = await res.json();
            setData(data);
        }
        fetchData();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const accessToken = localStorage.getItem('accessToken');
        try {
            const res = await fetch(`${BASE_URL}/users/api/orders/update/${id}/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                router.push('/userorders');
            } else {
                throw new Error('Error updating order');
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            if (name === "order_type") {
                return { ...prevData, [name]: value };
            }
            return { ...prevData, [name]: value };
        });
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="awb_number" className="block text-gray-700 font-bold mb-2">AWB Number:</label>
                    <span className="text-gray-700">{awb_number}</span>
                </div>
                <div className="mb-4">
                    <label htmlFor="order_type" className="block text-gray-700 font-bold mb-2">Order Type:</label>
                    <select name="order_type" value={formData.order_type} onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option disabled>Current Order Type: {formData.order_type}</option>
                        {formData.order_type === "logistics" ? (
                            <>
                                <option value="logistics">Logistic</option>
                                <option value="third_party">Third Party</option>
                            </>
                        ) : (
                            <>
                                <option value="third_party">Third Party</option>
                                <option value="logistics">Logistic</option>
                            </>
                        )}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="courier_company" className="block text-gray-700 font-bold mb-2">Courier Company:</label>
                    <input
                        type="text"
                        name="courier_company"
                        defaultValue={formData.courier_company}
                        onChange={handleChange}
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="destination" className="block text-gray-700 font-bold mb-2">Destination:</label>
                    <input
                        type="text"
                        name="destination"
                        defaultValue={formData.destination}
                        onChange={handleChange}
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="destination_pincode" className="block text-gray-700 font-bold mb-2">Destination Pincode:</label>
                    <input
                        type="text"
                        name="destination_pincode"
                        defaultValue={formData.destination_pincode}
                        onChange={handleChange}
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="return_address" className="block text-gray-700 font-bold mb-2">Return Address:</label>
                    <input
                        type="text"
                        name="return_address"
                        defaultValue={formData.return_address}
                        onChange={handleChange}
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="return_address_pincode" className="block text-gray-700 font-bold mb-2">Return Address Pincode:</label>
                    <input
                        type="text"
                        name="return_address_pincode"
                        defaultValue={formData.return_address_pincode}
                        onChange={handleChange}
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Order</button>
            </form>

        </Layout>
    );
};

export default EditUserOrder;
