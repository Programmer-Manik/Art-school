import { useQuery } from "@tanstack/react-query";

const usePopular = () => {
	const { data: popularClg = [], isLoading: popularClgLoading } = useQuery({
		queryKey: ["popularClass"],
		queryFn: async () => {
			const res = await fetch(
				"https://summer-capm-school-server.vercel.app/popularClass"
			);
			return res.json();
		},
	});

	const { data: topInstructor = [] } = useQuery({
		queryKey: ["topInstructor"],
		queryFn: async () => {
			const res = await fetch(
				"https://summer-capm-school-server.vercel.app/popularInstructor"
			);
			return res.json();
		},
	});

	return { popularClg, topInstructor, popularClgLoading };
};

export default usePopular;
