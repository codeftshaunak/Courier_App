import BASE_URL from "@/public/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const { default: AppadminLayout } = require("@/src/components/Dashboard/AppadminLayout");

const EditCustomer = () => {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState({});
    const [customer, setCustomer] = useState({
        is_verified: "",
        is_active: ""
    });

    useEffect(() => {
        customer.is_active = data.is_active;
        customer.is_verified = data.is_verified;
    }, [data]);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        async function fetchData() {
            const res = await fetch(`${BASE_URL}/appadmins/customers/${id}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const data = await res.json();
            setData(data);
        }
        fetchData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`${BASE_URL}/appadmins/customers/${id}/`, customer)
            .then((response) => {
                console.log(response.data);
                // handle success
                router.push('/coustomers')
            })
            .catch((error) => {
                console.error(error);
                // handle error
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCustomer({ ...customer, [name]: value });
    };

    console.log(data);

    return (
        <AppadminLayout>
            <div className="flex items-center space-x-4 justify-around">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-md w-96">
                        <h1 className="text-black text-lg font-bold">Update Status</h1>
                        <div className="mb-4">
                            <label htmlFor="user-verified" className="text-gray-700 font-semibold">
                                VERIFIED
                            </label>
                            <br />
                            <select
                                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                id="user-verified"
                                name="is_verified"
                                defaultValue={data.is_verified}
                                onChange={handleInputChange}
                            >
                                <option disabled>Select any option</option>
                                <option value="true">Verified</option>
                                <option value="false">Unverified</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status" className="text-gray-700 font-semibold">
                                STATUS
                            </label>
                            <select
                                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                id="status"
                                name="is_active"
                                defaultValue={data.is_active}
                                onChange={handleInputChange}
                            >
                                <option disabled>Select any option</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                        >
                            Update
                        </button>
                    </div>
                </form>
                <div className="bg-white p-4 rounded-lg shadow-md w-96">
                    <h1 className="text-black text-lg font-bold">Customer Details</h1>
                    <div className="photo">
                        <h1 className="text-black">Profile:</h1>
                        <img
                            src={data?.customer?.Photo}
                            alt="photo"
                            className="rounded-full w-24 h-24 object-cover mx-auto mb-4"
                        />
                    </div>

                    <div className="id_proof">
                        <h1 className="text-black">ID Proof:</h1>
                        <img
                            src={data?.customer?.ID_proof}
                            alt=""
                            className="w-24 h-24 object-cover mx-auto mb-4"
                        />
                    </div>

                    <div className="text-lg text-gray-800 mb-2">
                        <b> Name:</b>
                        {data?.first_name} {data?.last_name}
                    </div>
                    <div className="text-lg  text-gray-800 mb-2">
                        <b>Email:</b>   {data?.email}
                    </div>
                    <div className="text-lg text-gray-800 mb-2">
                        <b> Address: </b>{data?.customer?.address_line1}/{data?.customer?.address_line2}
                    </div>
                    <div className="text-lg  text-gray-800 mb-2">
                        <b>Address PIN:</b>  {data?.customer?.address_pincode}
                    </div>
                    <div className="text-lg text-gray-800 mb-2">
                        <b>Company Name:</b>  {data?.customer?.company_name}
                    </div>
                </div>
            </div>
        </AppadminLayout>

    );
};

export default EditCustomer;
