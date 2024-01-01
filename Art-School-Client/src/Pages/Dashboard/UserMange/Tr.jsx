const Tr = ({ user, index, makeInstructor, makeAdmin }) => {
	// TODO: same user email tr bg change
	return (
		<tr
			key={user?.id}
			// className="flex items-center justify-between border-b border-gray-300 py-4"
		>
			<td className="text-md">{index + 1}</td>
			<td className="text-md">{user?.displayName}</td>
			<td className="text-sm text-gray-500">{user?.email}</td>
			<td className="text-sm text-gray-500">Role: {user?.role || "user"}</td>
			<td className="text-sm text-gray-500">
				<div>
					{user?.role !== "Instructor" && (
						<button
							onClick={() => makeInstructor(user?._id, user?.displayName)}
							disabled={user?.role == "Admin" || user?.role == "Instructor"}
							// title={
							// 	(user?.role == "Admin" || user?.role == "Instructor") &&
							// 	"Already Roll changes".toString()
							// }
							className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
						>
							Make Instructor
						</button>
					)}

					{user?.role !== "Admin" && (
						<button
							onClick={() => makeAdmin(user?._id, user?.displayName)}
							disabled={user?.role == "Admin" || user?.role == "Instructor"}
							className="px-4 py-2 bg-green-500 text-white rounded"
						>
							Make Admin
						</button>
					)}
				</div>
			</td>
		</tr>
	);
};

export default Tr;
