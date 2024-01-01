import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSelectedClass = () => {
	const { isLoading, user } = useAuth();
	const [axiosSecure] = useAxiosSecure();
	const {
		data: mySelectedClass = [],
		refetch,
		isLoading: selectedLoading,
	} = useQuery({
		queryKey: ["mySelectedClass"],
		enabled: !isLoading,
		queryFn: async () => {
			const res = await axiosSecure(
				`https://summer-capm-school-server.vercel.app/my-selected/${user?.email}`
			);
			return res.data;
		},
	});
	return [mySelectedClass, refetch, selectedLoading];
};

export default useSelectedClass;
