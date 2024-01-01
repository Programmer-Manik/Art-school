import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../Components/Loading";
import useUser from "../hooks/useUser";

const PrivateRoute = ({ children }) => {
	const { user, isLoading } = useAuth();
	const { AUser, ALoading } = useUser();
	const location = useLocation();

	if (isLoading || ALoading) {
		return <Loading />;
	}

	if (user && AUser) {
		return children;
	}
	return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
