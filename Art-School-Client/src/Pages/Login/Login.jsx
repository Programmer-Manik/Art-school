import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SocialLogin from "../Shayed/SocialLogin/SocialLogin";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { user, signIn } = useContext(AuthContext);
	const { register, handleSubmit } = useForm();
	const location = useLocation();
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const from = location.state?.from?.pathname || "/";

	user && user.email && navigate("/");

	const LoginHandle = (e) => {
		console.log(
			`e.password == "admin@arts.com" -> `,
			e.password == "admin@arts.com"
		);

		if (e.password == "admin@arts.com") {
			console.log(
				`e.password == "admin@arts.com" -> `,
				e.password == "admin@arts.com"
			);
			signIn(e.email, e.password)
				.then((data) => {
					console.log(data);
					toast("Login successful", { type: "success" });
					navigate(from, { replace: true });
					setError(null);
				})
				.catch((err) => setError(err.message));
		} else if (e.password.length < 6) {
			setError("Password must be at least 6 characters.");
		} else if (!/[A-Z]/.test(e.password)) {
			setError("Password must contain at least one capital letter.");
		} else if (!/[!@#$%^&*]/.test(e.password)) {
			setError("Password must contain at least one special character.");
		} else {
			signIn(e.email, e.password)
				.then((data) => {
					console.log(data);
					toast("Login successful", { type: "success" });
					navigate(from, { replace: true });
					setError(null);
				})
				.catch((err) => setError(err.message));
		}
	};

	return (
		<div className="mc">
			<div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
				<div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
					<h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
						Sign in
					</h1>
					<form onSubmit={handleSubmit(LoginHandle)} className="mt-6">
						<div className="mb-2">
							<label
								htmlFor="email"
								className="text-sm font-semibold text-gray-800 flex gap-1"
							>
								Email <span className="text-red-500 text-lg">*</span>
							</label>
							<input
								{...register("email", { required: true })}
								type="email"
								className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
							/>
						</div>
						<div className="mb-2 relative">
							<label
								htmlFor="password"
								className="text-sm font-semibold text-gray-800 flex gap-1"
							>
								Password <span className="text-red-500 text-lg">*</span>
							</label>
							<input
								{...register("password", { required: true })}
								type={showPassword ? "text" : "password"}
								className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
							/>
							<button
								type="button"
								className="absolute bottom-1/4 right-3 transform translate-y-1/4"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
						<a href="#" className="text-xs text-purple-600 hover:underline">
							Forget Password?
						</a>
						{error && <p className="text-red-600 py-4"> {error} </p>}
						<div className="mt-6">
							<button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
								Login
							</button>
						</div>
					</form>
					<div className="relative flex items-center justify-center w-full mt-6 border border-t">
						<div className="absolute px-5 bg-white">Or</div>
					</div>

					{<SocialLogin />}

					<p className="mt-8 text-md font-light text-center text-gray-700">
						Don&apos;t have an account?
						<Link
							to="/signup"
							className="font-medium text-purple-600 hover:underline"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
