import { userAccounts } from '@/utils/api';
import React from 'react'

const Coustomer = () => {
    useEffect(() => {
        const fetchData = async () => {
            const data = await userAccounts();
            console.log(data);
        };
        fetchData();
    }, []);

    return (
        <div>

        </div>
    )
}

export default Coustomer;
