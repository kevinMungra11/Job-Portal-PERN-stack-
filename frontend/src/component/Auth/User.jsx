/* eslint-disable no-unused-vars */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

// eslint-disable-next-line react/prop-types
const UserRoute = ({ component: Component, ...rest }) => {
    if (isAuthenticated()) {
        return <Component />;
    } else {
        return <Navigate to="/user/signin" />
    }
    // return (
    //     <Route
    //         {...rest}
    //         render={props =>
    //             isAuthenticated() ? (
    //                 <Component {...props} />
    //             ) : (
    //                 <Navigate
    //                     to='/user/signin'
    //                 />
    //             )
    //         }
    //     />
    // )
}
export default UserRoute;