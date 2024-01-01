import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMyEnrolledClass = () => {
	const { user, isLoading } = useAuth();
	const [axiosSecure] = useAxiosSecure();

	const { refetch, data: myEnrolledClass = [] } = useQuery({
		queryKey: ["enrolledClass", user?.email],
		enabled: !isLoading,
		queryFn: async () => {
			const res = await axiosSecure(`/my-enroll-class/${user?.email}`);
			return res.data;
		},
	});

	return [myEnrolledClass, refetch];
};

export default useMyEnrolledClass;
