import { CloudArrowUpIcon, LockClosedIcon, PhoneIcon, LockOpenIcon, ArchiveBoxIcon, EyeIcon, ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import BASE_URL from '@/public/config';

const firebaseConfig = {
    apiKey: "AIzaSyCIoomfvPM8SRwqAOqYG4sgIyTy_tuWnOQ",
    authDomain: "courier-application-a7d23.firebaseapp.com",
    projectId: "courier-application-a7d23",
    storageBucket: "courier-application-a7d23.appspot.com",
    messagingSenderId: "357303065126",
    appId: "1:357303065126:web:d90fb7c0da1dce41c0e4e7",
    measurementId: "G-RH4VNVLJ45"
};

let messaging = null;

if (typeof window !== 'undefined') {
    // Initialize Firebase only on the client-side
    const app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
}

const sendTokenToServer = async (accessToken) => {
    if (messaging) {
        try {
            const token = await getToken(messaging, {
                vapidKey: 'BCVF3M-ob6qMAK9pPprwZOfB31OsWRFtX6srpdXw1Qjr5VRkUhKivBbt6b5cPBxW-uuR-QMXqTmoZGTfVe9ik9k',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const response = await axios.post(`${BASE_URL}/users/fcm-device/`, {
                registration_id: token,
            });
            console.log('Token sent successfully:', response.data);
        } catch (error) {
            console.error('Failed to send token:', error);
        }
    }
};

const handleNotificationPermission = async (accessToken) => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted' && accessToken) {
            await sendTokenToServer(accessToken);
        } else if (permission === 'denied') {
            alert('You denied the notification');
        } else {
            console.log('User is not logged in');
        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
    }
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

if (typeof window !== 'undefined') {
    handleNotificationPermission(accessToken);
}


const features = [
    {
        name: 'Track Your Oreder',
        description:
            'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Super First Service',
        description:
            'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
        icon: LockClosedIcon,
    },
    {
        name: 'Best Coustomer Support',
        description:
            'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
        icon: PhoneIcon,
    },
    {
        name: 'Advanced security',
        description:
            'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
        icon: LockOpenIcon,
    },
]

const chooseUs = [
    {
        name: 'Mission',
        description: "Our mission is to provide fast, reliable, and affordable delivery services to our customers, while upholding the highest standards of professionalism and customer service. We strive to be a trusted partner for businesses and individuals alike, offering personalized solutions that meet their unique needs. Through our commitment to excellence, we aim to become the go-to courier service for customers across our service area, while giving back to our community through philanthropic initiatives and environmental stewardship.",
        icon: ArchiveBoxIcon,
    },
    {
        name: 'Vision',
        description: "Our vision is to become the most reliable and efficient courier service provider in the world, leveraging technology and innovation to exceed our customers' expectations and create long-term value for our stakeholders.",
        icon: EyeIcon,
    },
    {
        name: 'Goal',
        description: "A goal of a courier service could be to provide fast, reliable and cost-effective delivery services to businesses and individuals. Other goals could include expanding the service to cover more areas, improving technology to enhance tracking and communication, reducing environmental impact, and providing exceptional customer service.",
        icon: ArchiveBoxXMarkIcon,
    }
]




export default function Example() {
    // const accessToken = localStorage.getItem('accessToken');
    // useEffect(() => {
    //     const permission = Notification.requestPermission();

    //     if (permission === 'granted' && accessToken) {
    //         // Generate Token
    //         const token = getToken(messaging, {
    //             vapidKey: 'BCVF3M-ob6qMAK9pPprwZOfB31OsWRFtX6srpdXw1Qjr5VRkUhKivBbt6b5cPBxW-uuR-QMXqTmoZGTfVe9ik9k',
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         });

    //         try {
    //             const response = axios.post(`${BASE_URL}/users/fcm-device/`, {
    //                 registration_id: token,
    //             });
    //             console.log('Token sent successfully:', response.data);
    //         } catch (error) {
    //             console.error('Failed to send token:', error);
    //         }

    //     } else if (permission === 'denied') {
    //         alert('You denied the notification');
    //     } else {
    //         console.log('User is not logged in');
    //     }
    // }, [accessToken]);

    const accessToken = typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null;
    useEffect(() => {
        const permission = Notification.requestPermission();

        if (permission === 'granted' && accessToken) {
            // Generate Token
            const token = getToken(messaging, {
                vapidKey: 'BCVF3M-ob6qMAK9pPprwZOfB31OsWRFtX6srpdXw1Qjr5VRkUhKivBbt6b5cPBxW-uuR-QMXqTmoZGTfVe9ik9k',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            try {
                const response = axios.post(`${BASE_URL}/users/fcm-device/`, {
                    registration_id: token,
                });
                console.log('Token sent successfully:', response.data);
            } catch (error) {
                console.error('Failed to send token:', error);
            }

        } else if (permission === 'denied') {
            alert('You denied the notification');
        } else {
            console.log('User is not logged in');
        }
    }, [accessToken]);


    // const accessToken = localStorage.getItem('accessToken');
    // useEffect(() => {
    //     const requestPermission = async () => {
    //         const permission = await Notification.requestPermission();
    //         return permission;
    //     };

    //     const sendToken = async () => {
    //         const messaging = firebase.messaging();
    //         const vapidKey = 'BCVF3M-ob6qMAK9pPprwZOfB31OsWRFtX6srpdXw1Qjr5VRkUhKivBbt6b5cPBxW-uuR-QMXqTmoZGTfVe9ik9k';

    //         if (!messaging || !accessToken) {
    //             console.log('User is not logged in');
    //             return;
    //         }

    //         try {
    //             const permission = await requestPermission();

    //             if (permission === 'granted') {
    //                 // Generate Token
    //                 const token = await messaging.getToken({
    //                     vapidKey,
    //                     headers: {
    //                         Authorization: `Bearer ${accessToken}`,
    //                     },
    //                 });

    //                 const response = await axios.post(`${BASE_URL}/users/fcm-device/`, {
    //                     registration_id: token,
    //                 });
    //                 console.log('Token sent successfully:', response.data);
    //             } else if (permission === 'denied') {
    //                 alert('You denied the notification');
    //             }
    //         } catch (error) {
    //             console.error('Failed to send token:', error);
    //         }
    //     };

    //     sendToken();
    // }, [accessToken]);



    return (
        <>
            <div className="bg-color py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Deliver with ease, anywhere, anytime with our courier!
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
                            pulvinar et feugiat blandit at. In mi viverra elit nunc.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Why you choose us */}
            <div className="bg-color py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Why You Choose Us?
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            "Choose us for hassle-free deliveries and peace of mind knowing your packages are in safe hands. We go the extra mile to ensure your satisfaction, with reliable service and timely updates every step of the way."
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {chooseUs.map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </>

    )
}

