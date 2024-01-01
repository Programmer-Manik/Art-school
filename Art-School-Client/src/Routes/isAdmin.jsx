import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useAdmin = () => {
	const { user, isLoading } = useAuth();
	const [axiosSecure] = useAxiosSecure();

	const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
		queryKey: ["isAdmin", user?.email],
		enabled: !isLoading,
		queryFn: async () => {
			const res = await axiosSecure.get(`/users/admin/${user?.email}`);
			return res.data.admin;
		},
	});
	return [isAdmin, isAdminLoading];
};
export default useAdmin;
