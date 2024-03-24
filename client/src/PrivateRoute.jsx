// // PrivateRoute.jsx
// import { Route, Navigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuthenticated = async () => {
//       try {
//         const res = await axios.get("http://localhost:7000/api/secure-data", {
//           withCredentials: true,
//         });
//         if (res.status === 200 && res.data.success) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error("Error occurred during authentication check:", error);
//         setIsAuthenticated(false);
//       }
//     };

//     checkAuthenticated();
//   }, []); // Run only once when the component mounts

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? <Element /> : <Navigate to="/login" replace />}
//     />
//   );
// };

// export default PrivateRoute;
