import { Navigate } from "react-router-dom";
import {localStorageGetItem} from "./../../helpers/IsHelpers"

const PrivateRoute = ({children}) => {
    return  localStorageGetItem("token") ? children : <Navigate to = {"/loginPage"}/>
};
export default PrivateRoute;