import { useContext } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
	const { googleLogin } = useContext(AuthContext);
	const navigate = useNavigate();

	const googleHandle = () => {
		googleLogin()
			.then(({ user }) => {
				// toast("google login success", { type: "success" });

				console.log(user);

				const { displayName, email, password, photoURL } = user;

				const saveUser = {
					displayName,
					email,
					password: password || "google login",
					address: password || "google login",
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
					.then((saved) => {
						console.log(saved);
						if (saved?.insertedId) {
							Swal.fire("Good job!", "Sign Up Success", "success");
						}

						Swal.fire("Good job!", "Login Success", "success");
						navigate("/");
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="flex mt-4 gap-x-2">
			<button
				onClick={googleHandle}
				className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
			>
				<AiFillGoogleCircle className="w-6 h-6" />
			</button>
		</div>
	);
};

export default SocialLogin;
