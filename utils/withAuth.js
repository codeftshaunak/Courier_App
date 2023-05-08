// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// const withAuth = (Component) => {
//     const Auth = (props) => {
//         const router = useRouter();
//         const [accessToken, setAccessToken] = useState(null);

//         useEffect(() => {
//             const token = localStorage.getItem('accessToken');
//             setAccessToken(token);
//         }, []);

//         useEffect(() => {
//             // Check if the user is authenticated
//             const isAuthenticated = accessToken ? true : false;

//             // If not authenticated, redirect to login page
//             if (!isAuthenticated) {
//                 router.push('/signin');
//             }
//         }, []);

//         // If authenticated, render the protected page
//         return accessToken ? <Component {...props} /> : null;
//     };

//     return Auth;
// };

// export default withAuth;
