import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Custom hook to check authentication status and redirect if necessary
export const useAuth = (authenticated) => {
    const router = useRouter();

    useEffect(() => {
        // If the user is not authenticated, redirect to the sign-in page
        if (!authenticated) {
            router.push('/signin');
        }
    }, [authenticated, router]);

    return authenticated;
};
