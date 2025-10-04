import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// AuthLayout wraps routes to enforce authentication rules.
// Props:
//  authentication (boolean):
//    true  => protected route (must be logged in)
//    false => public-only route (redirect home if already logged in)
export default function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        // Protected: user not logged in -> login page
        if (authentication && !authStatus) {
            navigate('/login');
        }
        // Public-only (e.g., login/signup) and user is logged in -> home
        if (!authentication && authStatus) {
            navigate('/');
        }
        setChecking(false);
    }, [authentication, authStatus, navigate]);

    if (checking) return <h1>Loading...</h1>;
    return <>{children}</>;
}

