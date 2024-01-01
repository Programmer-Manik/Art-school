import { createBrowserRouter } from "react-router-dom";
import MainLT from "../Layouts/MainLT/MainLT";
import Home from "../Pages/Home/Home";
import DashboardLT from "../Layouts/Dashboard/DashboardLT";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ClassesMange from "../Pages/Dashboard/ClassesMange/ClassesMange";
import UserMange from "../Pages/Dashboard/UserMange/UserMange";
import Payment from "../Pages/Dashboard/Payment/Payment";
import AddAClass from "../Pages/Dashboard/AddAClass/AddAClass";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import Classes from "../Pages/Classes/Classes";
import Instructor from "../Pages/Instructor/Instructor";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MySelectedClass from "../Pages/Dashboard/MySelectedClass/MySelectedClass";
import MyEnrolledClass from "../Pages/Dashboard/MyEnrolledClass/MyEnrolledClass";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import PrivateRoute from "./PrivateRoute";

const Route = createBrowserRouter([
	{
		path: "/",
		element: <MainLT />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/classes",
				element: <Classes />,
			},
			{
				path: "/instructors",
				element: <Instructor />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
		],
	},
	{
		path: "dashboard",
		element: (
			<PrivateRoute>
				{" "}
				<DashboardLT />{" "}
			</PrivateRoute>
		),
		children: [
			{
				path: "user-mange",
				element: (
					<PrivateRoute>
						<UserMange />
					</PrivateRoute>
				),
			},
			{
				path: "classes-mange",
				element: <ClassesMange />,
			},
			{
				path: "my-classes",
				element: <MyClasses />,
			},
			{
				path: "AddAClass",
				element: <AddAClass />,
			},
			{
				path: "payment",
				element: <Payment />,
			},
			{
				path: "payment-history",
				element: <PaymentHistory />,
			},
			{
				path: "my-selected-class",
				element: <MySelectedClass />,
			},
			{
				path: "my-enrolled-class",
				element: <MyEnrolledClass />,
			},
		],
	},
]);

export default Route;
