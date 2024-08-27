// import React, { useContext } from 'react';
// import { Route,Redirect } from 'react-router-dom';
// import { UserContext } from '../../App';

// const PrivateRoute = ({children, ...rest}) => {

//     const [loggedInUser,setLoggedInUser]=useContext(UserContext);
//     return (
//         <Route
//       {...rest}
//       render={({ location }) =>
//         localStorage.email ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//     );
// };

// export default PrivateRoute;
















import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({ children }) => {
  const [loggedInUser] = useContext(UserContext);
  let location = useLocation();

  if (!loggedInUser.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
