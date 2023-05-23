import BASE_URL from "@/public/config";
import axios from 'axios';


//fetch Courier List
export const fetchCourierList = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await fetch(`${BASE_URL}/users/api/orders/courier/list/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
};

//post for signIn
export const signIn = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/token/login/`, { username, password });
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
};

//post for adminsignin
export const adminSignIn = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/appadmins/api/admin/token`, { username, password });
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

//post for update order
// export const appAdminOrderUpdate = async (key, value) => {
//     const accessToken = localStorage.getItem('accessToken');
//     try {
//         const response = await axios.post(`${BASE_URL}/appadmins/orders/update/`, { key, value }, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             }
//         });
//         const data = await response.data;
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// };


//get appadmins
export const appAdminsOrder = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await fetch(`${BASE_URL}/appadmins/orders/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return console.log(error);
    }
}

//user account
export const userAccounts = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await fetch(`${BASE_URL}/users/api/accounts/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return console.log(error);
    }
}

//user complaints
export const userComplaints = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await fetch(`${BASE_URL}/users/api/complaints`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return console.log(error)
    }
}


//user order courier
export const userCourierOrders = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await fetch(`${BASE_URL}/users/api/orders/courier/list/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return console.log(error)
    }
}


//Rise a complaint
export const RiseComplaint = async (order_id) => {
    console.log(order_id);
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios.post(
            `${BASE_URL}/users/api/complaint-raise`,
            {
                order_id: order_id
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        const data = await response.data;
        return data;
    }
    catch (error) {
        console.log(error);
    }
};

//resolveComplain
export const ResolveComplaint = async (awb_number) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    try {
        const response = await axios.patch(`${BASE_URL}/users/accounts/${awb_number}/resolve_complaint/`, null, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await response.data;
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

//appadmin userslist 
export const usersList = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios.get(`${BASE_URL}/appadmins/api/accounts/list`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const data = response.data;
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


//appadin customer 
export const customerList = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios.get(`${BASE_URL}/appadmins/customers/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const data = response.data;
        // console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

