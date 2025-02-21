import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const Checkauth = ({ isAuthenticated, user, children }) => {

    const location = useLocation()


    console.log(location.pathname, isAuthenticated);


    if (location.pathname === '/') {
        if (!isAuthenticated) {
            return <Navigate to='/auth/login' />
        }
        else {
            if (user?.role === "admin") {
                return <Navigate to="/admin/dashboard" />
            } else {

                return <Navigate to="/shop/home" />
            }
        }
    }


    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        return <Navigate to='/auth/login' />
    }

    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes("/register"))) {
        console.log("User role:", user.role);
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />
        } else {

            return <Navigate to="/shop/home" />
        }



    }

    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes("/admin")) {
        return <Navigate to="/unauthpage" />
    }
    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes("/shop")) {
        return <Navigate to="/admin/dashboard" />
    }


    return children;


}

export default Checkauth
