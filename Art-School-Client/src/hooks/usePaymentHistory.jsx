import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMyClass = () => {
	const { user, isLoading } = useAuth();
	const [axiosSecure] = useAxiosSecure();

	const { refetch, data: paymentHistory = [] } = useQuery({
		queryKey: ["history", user?.email],
		enabled: !isLoading,
		queryFn: async () => {
			const res = await axiosSecure(`/payment-history/${user?.email}`);
			return res.data;
		},
	});

	return [paymentHistory, refetch];
};

export default useMyClass;
