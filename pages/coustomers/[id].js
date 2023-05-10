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
    console.log(customer);

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

        axios.patch(`${BASE_URL}/appadmins/customers/${id}/`, customer)
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

    return (
        <AppadminLayout>
            <h1>Edit Customer - {data.email}</h1>
            <div className="flex space-x-4">
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <label htmlFor="#">VERIFIED</label>
                        <br />
                        <select
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            id="user-verified"
                            name="is_verified"
                            defaultValue={data.is_verified}
                            onChange={handleInputChange}
                        >
                            <option>Select Any Option</option>
                            <option value="true">Verified</option>
                            <option value="False">Unverified</option>
                        </select>
                        <br />
                        <label htmlFor="#">STATUS</label>
                        <select
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            id="status"
                            name="is_active"
                            defaultValue={data.is_active}
                            onChange={handleInputChange}
                        >
                            <option>Select Any Option</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                        <br />
                        <button type="submit">Update</button>
                    </div>
                </form>
            </div>
        </AppadminLayout>
    );
};

export default EditCustomer;
