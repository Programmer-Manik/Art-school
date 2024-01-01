import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAllUser = () => {
	const [axiosSecure] = useAxiosSecure();
	const { user, isLoading } = useAuth();
	const {
		refetch,
		data: users = [],
		isLoading: usersLoading,
	} = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			if (!axiosSecure) {
				// Handle the case where axiosSecure is undefined
				throw new Error("axiosSecure is not initialized");
			}
			const res = await axiosSecure.get(`/allUsers`);
			console.log("users response -> ", res);
			return res.data;
		},
		enabled: !isLoading && !!user?.email,
		cacheTime: 0,
	});

	return [users, refetch, usersLoading];
};

export default useAllUser;
