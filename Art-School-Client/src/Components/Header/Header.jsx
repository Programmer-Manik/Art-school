import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemesMode from "../../Pages/Shayed/ThemesMode/ThemesMode";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";

const Header = () => {
	const [isAdmin, setAdmin] = useState(true);
	const [show, setShow] = useState(false);
	const { user, logOut, isLoading } = useAuth();
	const { AUser, ALoading } = useUser();

	console.log("AUser?.role -> ", AUser?.role);
	console.log("Auser? -> ", ALoading);

	isLoading || (ALoading && <Loading />);

	const menuItems = (
		<>
			<li>
				<NavLink to="/"> Home </NavLink>
			</li>
			<li>
				<NavLink to="/instructors">Instructors</NavLink>
			</li>
			<li>
				<NavLink to="/classes">Classes</NavLink>
			</li>

			{user?.email && !ALoading && AUser?.role && (
				<li>
					<NavLink
						to={`/dashboard/${
							AUser?.role == "Instructor"
								? "my-classes"
								: AUser?.role == "Admin"
								? "user-mange"
								: AUser?.role == "Student" && "my-selected-class"
						}`}
					>
						Dashboard
					</NavLink>
				</li>
			)}

			{!user?.email && (
				<li>
					<NavLink to="/login">Login</NavLink>
				</li>
			)}
		</>
	);

	return (
		<div className="mc">
			<div className="navbar bg-base-100">
				<div className="navbar-start">
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className="menu z-20 menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							{menuItems}
						</ul>
					</div>
					<a className="btn btn-ghost normal-case text-xl"> Arts-School </a>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1">{menuItems}</ul>
				</div>
				<div className="navbar-end">
					<div className="flex gap-3">
						{<ThemesMode />}

						<div className="relative">
							{user?.email && (
								<div onClick={() => setShow(!show)}>
									<img
										className="w-9 h-9 rounded-full cursor-pointer"
										src={user?.photoURL}
									/>
								</div>
							)}

							{show && user && (
								<div className="absolute z-10 top-full right-0 rounded-md p-2 bg-slate-200">
									<ul className="text-center">
										<li>{user?.email}</li>
										<li>
											{" "}
											<button
												onClick={() => {
													setShow(!show);
													logOut();
												}}
												className="btn"
											>
												{" "}
												Log Out{" "}
											</button>{" "}
										</li>
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
