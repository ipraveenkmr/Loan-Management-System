import { useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


export default function AuthLayout() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         if (user) {
    //             console.log(user);
    //             navigate('/');
    //         }
    //     });

    //     return () => unsubscribe();
    // }, []);

    return (
        <>
            <Outlet />
        </>
    )
}
