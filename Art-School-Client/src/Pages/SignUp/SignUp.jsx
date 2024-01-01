import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SocialLogin from "../Shayed/SocialLogin/SocialLogin";
import { useContext, useRef, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
	const navigate = useNavigate();
	const { signUp, updateUserProfile } = useContext(AuthContext);
	const Cpassword = useRef();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const SignUpHandle = (e) => {
		console.log(e);
		console.log(e.password);
		console.log(Cpassword.current.value);

		if (e.password !== Cpassword.current.value) {
			setError("Password does not match");
		} else if (e.password.length < 6) {
			setError("Password must be at least 6 characters.");
		} else if (!/[A-Z]/.test(e.password)) {
			setError("Password must contain at least one capital letter.");
		} else if (!/[!@#$%^&*]/.test(e.password)) {
			setError("Password must contain at least one special character.");
		} else {
			const { displayName, phoneNumber, address, email, password, photoURL } =
				e;

			console.log("submited");

			signUp(email, password).then((result) => {
				const updateUser = { displayName, phoneNumber, photoURL };
				console.log(updateUser);
				console.log("Sign up user ", result);
				updateUserProfile(updateUser);

				const saveUser = {
					displayName,
					email,
					password,
					address,
					role: "Student",
					photoURL,
				};
				console.log(saveUser);

				fetch("https://summer-capm-school-server.vercel.app/users", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(saveUser),
				})
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						if (data?.insertedId) {
							setError(null);
							Swal.fire("Good job!", "Sign Up Success", "success");
							navigate("/");
						}
					})
					.catch((err) => console.log(err));
			});
		}
	};

	return (
		<div className="mc">
			<div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
				<div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
					<h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
						Sign Up
					</h1>
					<form onSubmit={handleSubmit(SignUpHandle)} className="mt-6">
						<div className="mb-2">
							<label
								htmlFor="fullName"
								className="text-sm font-semibold text-gray-800 flex gap-1"
							>
								Full Name : <span className="text-red-500 text-lg">*</span>
							</label>
							<input
								{...register("displayName", { required: true })}
								type="text"
								className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
							/>
						</div>

						<div className="mb-2">
							<label
								htmlFor="email"
								className="text-sm font-semibold text-gray-800 flex gap-1"
							>
								Email : <span className="text-red-500 text-lg">*</span>
							</label>
							<input
								{...register("email", { required: true })}
								type="email"
								className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
							/>
						</div>

						<div className="mb-2">
							<label
								htmlFor="phoneNumber"
								className="text-sm font-semibold text-gray-800 flex gap-1"
							>
								Phone Number: <span className="text-red-500 text-lg">*</span>
							</label>
							<input
								{...register("phoneNumber", { required: true })}
								type="number"
								className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
							/>
						</div>

						<div className="mb-2">
							<label
								htmlFor="photoURL"
								className="text-sm font-semibold text-gray-800 flex gap-1"
							>
								Photo URL : <span className="text-red-500 text-lg">*</span>
							</label>
							<input
								{...register("photoURL", { required: true })}
								type="text"
								className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
							/>
						</div>

						<div className="mb-2">
							<label
								htmlFor="photoURL"
								className="text-sm font-semibold text-gray-800 flex gap-1"
							>
								Address : <span className="text-red-500 text-lg">*</span>
							</label>
							<input
								{...register("address", { required: false })}
								type="text"
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
						<div className="mb-2 relative">
							<label
								htmlFor="password"
								className="text-sm font-semibold text-gray-800 flex gap-1"
							>
								Confirm Password <span className="text-red-500 text-lg">*</span>
							</label>
							<input
								ref={Cpassword}
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

						{error && <p className="text-red-600 py-4"> {error} </p>}

						<div className="mt-6">
							<button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
								Registration
							</button>
						</div>
					</form>
					<div className="relative flex items-center justify-center w-full mt-6 border border-t">
						<div className="absolute px-5 bg-white">Or</div>
					</div>

					{<SocialLogin />}

					<p className="mt-8 text-md font-light text-center text-gray-700">
						Already account?
						<Link
							to="/login"
							className="font-medium text-purple-600 hover:underline"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
