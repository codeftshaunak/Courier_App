import BASE_URL from '@/public/config';
import AppadminLayout from '@/src/components/Dashboard/AppadminLayout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const EditOrder = () => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState({
        courier_company: '',
        status: '',
        shipment_date: '',
        order_type: '',
        destination: '',
        destination_pincode: '',
        Image: null
    });

    const [data, setData] = useState([]);

    const { courier_company, status, shipment_date, order_type, destination, destination_pincode } = data;
    console.log(order_type);
    console.log(formData.order_type);
    useEffect(() => {
        formData.courier_company = courier_company,
            formData.status = status,
            formData.shipment_date = shipment_date,
            formData.order_type = order_type,
            formData.destination = destination,
            formData.destination_pincode = destination_pincode
    }, [data])

    // Fetch order data on component mount
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        async function fetchData() {
            const res = await fetch(`${BASE_URL}/appadmins/orders/${id}/`, {
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
            const res = await fetch(`${BASE_URL}/appadmins/orders/${id}/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                router.push('/appadmins');
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

    //Handle Image Change
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setFormData((prevData) => {
            return { ...prevData, Image: file }
        });
    };

    return (
        <AppadminLayout>
            <h1 className="text-2xl font-bold mb-4">Edit Order {id}</h1>
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <label htmlFor="order_type" className="block font-medium mb-1">
                        Order Type:
                    </label>
                    <select
                        name="order_type"
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    >
                        <option defaultValue={formData.order_type}>{formData.order_type}</option>
                        {formData.order_type === "logistics" ? (
                            <option value="third_party">Third Party</option>
                        ) : (
                            <option value="logistics">Logistic</option>
                        )}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="courier_company" className="block font-medium mb-1">
                        Courier Company:
                    </label>
                    <input
                        type="text"
                        name="courier_company"
                        defaultValue={formData.courier_company}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block font-medium mb-1">
                        Status:
                    </label>
                    <select
                        name="status"
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    >
                        <option defaultValue={formData.status}>{formData.status}</option>
                        <option value="preparing">Preparing</option>
                        <option value="manifested">Manifested</option>
                        <option value="in_transit">In Transit</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="shipment_date" className="block font-medium mb-1">
                        Shipment Date:
                    </label>
                    <input
                        type="text"
                        name="shipment_date"
                        defaultValue={formData.shipment_date}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="destination" className="block font-medium mb-1">
                        Destination:
                    </label>
                    <input
                        type="text"
                        name="destination"
                        defaultValue={formData.destination}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="destination_pincode" className="block font-medium mb-1">
                        Destination Pincode:
                    </label>
                    <input
                        type="text"
                        name="destination_pincode"
                        defaultValue={formData.destination_pincode}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block font-medium mb-1">
                        Upload Image:
                    </label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageUpload}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                >
                    Update Order
                </button>
            </form>
        </AppadminLayout>

    );
};

export default EditOrder;
