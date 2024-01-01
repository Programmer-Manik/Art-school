import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
	const { user, isLoading } = useAuth();
	const [axiosSecure] = useAxiosSecure();
	const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
		queryKey: ["isAdmin", user?.email],
		enabled: !isLoading && !!user?.email,
		queryFn: async () => {
			if (user?.email) {
				const res = await axiosSecure.get(`/users/admin/${user?.email}`);
				return res.data?.admin;
			}
			return false;
		},
	});

	return [isAdmin, isAdminLoading];
};
export default useAdmin;
