import Loading from "../../../Components/Loading";
import useAllUser from "../../../hooks/useAllUser";
import Tr from "./Tr";
import { toast } from "react-hot-toast";

const UserMange = () => {
	const [users, refetch, usersLoading] = useAllUser();

	usersLoading && <Loading />;

	console.log("current users -> ", users);

	const updateFC = (userId, userName, role) => {
		fetch(
			`https://summer-capm-school-server.vercel.app/users/role-update/${userId}`,
			{
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ role: role }),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				refetch();
				if (data.modifiedCount > 0) {
					toast.success(
						`${userName} has been updated successfully with Instructor`
					);
				}
			})
			.catch((err) => {
				toast.error(err.message);
				console.log(err);
			});
	};

	const makeInstructor = (userId, userName) => {
		console.log("makeInstructor", userId);

		updateFC(userId, userName, "Instructor");

		// setShowUsers((prevUsers) =>
		// 	prevUsers.map((user) =>
		// 		user._id === userId ? { ...user, role: "Instructor" } : user
		// 	)
		// );
	};

	const makeAdmin = (userId, userName) => {
		console.log("makeAdmin", userId);

		updateFC(userId, userName, "Admin");

		// setShowUsers((prevUsers) =>
		// 	prevUsers.map((user) =>
		// 		user._id === userId ? { ...user, role: "Admin" } : user
		// 	)
		// );
	};

	return (
		<div>
			<h2 className="text-3xl font-bold mb-4 text-center"> UserMange </h2>
			<div className=" overflow-scroll max-h-[calc(100vh-100px)] w-11/12 mx-auto border border-collapse">
				<div className="overflow-x-auto w-full">
					<table className="table w-full  ">
						<thead>
							<tr className="font-bold text-lg">
								<th>*</th>
								<th>Name</th>
								<th>Email</th>
								<th>Role</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{users &&
								users.map((user, i) => (
									<Tr
										key={user._id}
										user={user}
										index={i}
										makeInstructor={makeInstructor}
										makeAdmin={makeAdmin}
									/>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default UserMange;
