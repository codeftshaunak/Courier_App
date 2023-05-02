import Layout from '@/src/components/Dashboard/Layout';
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
        destination_pincode: ''
    });

    const [data, setData] = useState([]);

    const { awb_number, courier_company, status, shipment_date, order_type, destination, destination_pincode } = data;
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
            const res = await fetch(`http://65.0.3.25:8000/appadmins/orders/${id}/`, {
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
            const res = await fetch(`http://65.0.3.25:8000/appadmins/orders/${id}/`, {
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

    return (
        <Layout>
            <h1>Edit Order {id}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="awb_number">AWB Number:</label>
                    {awb_number}
                </div>
                <div>
                    <label htmlFor="order_type">Order Type</label>
                    <select name="order_type" onChange={handleChange}>
                        <option defaultValue={formData.order_type}>{formData.order_type}</option>
                        {
                            formData.order_type == "logistics" ? <option value="third_party">Third Party</option>
                                : <option value="logistics">Logistic</option>
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="courier_company">Courier Company:</label>
                    <input
                        type="text"
                        name="courier_company"
                        defaultValue={formData.courier_company}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <select name="status" onChange={handleChange}>
                        <option defaultValue={formData.status}>{formData.status}</option>
                        <option value="preparing">Preparing</option>
                        <option value="manifested">Manifested</option>
                        <option value="in_transit">In_transit</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="shipment_date">Shipment Date:</label>
                    <input
                        type="text"
                        name="shipment_date"
                        defaultValue={formData.shipment_date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="destination">Destination:</label>
                    <input
                        type="text"
                        name="destination"
                        defaultValue={formData.destination}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="destination">Destination Pincode:</label>
                    <input
                        type="text"
                        name="destination"
                        defaultValue={formData.destination_pincode}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Order</button>
            </form>
        </Layout>
    );
};

export default EditOrder;
