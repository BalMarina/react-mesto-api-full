import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, loggedIn, ...props }) => {
    if (!loggedIn) {
        return <Navigate to='/sign-in' />
    }
    return <Component {...props} />
};

export default ProtectedRoute; 