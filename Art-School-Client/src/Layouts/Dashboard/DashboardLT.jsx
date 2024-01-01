import { NavLink, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import ThemesMode from "../../Pages/Shayed/ThemesMode/ThemesMode";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import {
	HiHome,
	HiUserGroup,
	HiClipboardList,
	HiUserCircle,
	HiCurrencyDollar,
} from "react-icons/hi";
import { FaFolderPlus } from "react-icons/fa";
import useAOS from "../../hooks/useAos";

const DashboardLT = () => {
	const { user } = useContext(AuthContext);
	const [userData, setUser] = useState({});
	console.log("Auth Context user -> ", user);
	useAOS();

	useEffect(() => {
		if (user) {
			fetch(`https://summer-capm-school-server.vercel.app/user/${user?.email}`)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setUser(data);
				})
				.catch((err) => console.log(err));
		}
	}, [user]);

	console.log("user Data -> ", userData);

	return (
		<div>
			<div className="drawer lg:drawer-open">
				<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col items-center justify-start">
					{/* Page content here */}
					<label
						htmlFor="my-drawer-2"
						className="btn btn-primary  drawer-button lg:hidden"
					>
						<GiHamburgerMenu />
					</label>

					<div className="w-full">
						<Outlet />
					</div>
				</div>
				<div data-aos="fade-right" className="drawer-side">
					<div className="w-80 h-full bg-base-200 relative">
						<div className="text-center p-4">
							<h1 className="text-2xl font-bold">Arts-School</h1>
							<p className="text-md font-semibold">
								{userData.role === "Instructor" && "Instructor"}
								{userData.role === "Admin" && "Admin"}
								{userData.role === "Student" && "Student"} {" - "}
								Dashboard
							</p>
						</div>

						<div className="absolute top-5 right-5">
							<ThemesMode />
						</div>

						<label htmlFor="my-drawer-2" className="drawer-overlay"></label>
						<ul className="menu p-4 text-base-content">
							{/* Sidebar content here */}

							{/* Admin Routes */}
							{userData.role === "Admin" && (
								<>
									<li>
										<NavLink to="/dashboard/user-mange">
											<HiUserGroup />
											User Mange
										</NavLink>
									</li>
									<li>
										<NavLink to="/dashboard/classes-mange">
											<HiClipboardList />
											Classes Mange
										</NavLink>
									</li>
								</>
							)}

							{/* Instructor Routes */}
							{userData.role === "Instructor" && (
								<>
									<li>
										<NavLink to="/dashboard/my-classes">
											<HiUserCircle />
											My Class
										</NavLink>
									</li>
									<li>
										<NavLink to="/dashboard/addAClass">
											<FaFolderPlus />
											Add A Class
										</NavLink>
									</li>
								</>
							)}

							{/* Student Route */}
							{userData?.role === "Student" && (
								<>
									<li>
										<NavLink to="/dashboard/my-selected-class">
											<HiUserCircle />
											My Selected Class
										</NavLink>
									</li>
									<li>
										<NavLink to="/dashboard/my-enrolled-class">
											<HiUserCircle />
											My Enrolled Class
										</NavLink>
									</li>
									<li>
										<NavLink to="/dashboard/payment-history">
											<HiCurrencyDollar />
											Payment History
										</NavLink>
									</li>
								</>
							)}

							<div className="border border-slate-200 my-1"></div>

							<li>
								<NavLink to="/">
									<HiHome />
									Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/instructors">
									<HiUserGroup />
									Instructors
								</NavLink>
							</li>
							<li>
								<NavLink to="/classes">
									<HiClipboardList />
									Classes
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLT;
