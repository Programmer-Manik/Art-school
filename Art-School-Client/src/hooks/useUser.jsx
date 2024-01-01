import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
	const { user, isLoading } = useAuth();
	const [axiosSecure] = useAxiosSecure();

	const { data: AUser, isLoading: ALoading } = useQuery({
		queryKey: ["user"],
		enabled: !isLoading && !!user?.email,
		queryFn: async () => {
			const res = await axiosSecure(`/user/${user?.email}`);
			return res.data;
		},
	});
	return { AUser, ALoading };
};

export default useUser;
