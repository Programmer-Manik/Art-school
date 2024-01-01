import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useClasses = () => {
	const { isLoading } = useAuth();
	const [axiosSecure] = useAxiosSecure();

	const { refetch, data: classes = [] } = useQuery({
		queryKey: ["classes"],
		enabled: !isLoading,
		queryFn: async () => {
			const res = await axiosSecure("/classes");
			return res.data;
		},
	});

	return [classes, refetch];
};

export default useClasses;
