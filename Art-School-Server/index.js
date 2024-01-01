require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.PAYMENT_METHOD_SK);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
	const authorization = req.headers.authorization;

	if (!authorization) {
		return res
			.status(401)
			.send({ error: true, message: "Unauthorized access" });
	}
	const token = authorization.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
		if (error) {
			return res
				.status(403)
				.send({ error: true, message: "Unauthorized access" });
		}

		req.decoded = decoded;
		next();
	});
};

const verifyAdmin = async (req, res, next) => {
	const email = req.decoded.email;
	const query = { email: email };
	const user = await usersCollection.findOne(query);
	if (user?.role != "Admin" || user.role != "Instructor") {
		return res.status(403).send({ error: true, message: "forbidden message" });
	}
	next();
};

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.krol4pa.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

const dbConnect = async () => {
	try {
		client.connect();
		console.log("Database Connected Successfully✅");
	} catch (error) {
		console.log(error.name, error.message);
	}
};
dbConnect();

const db = client.db("A12-Arts-School");
const usersCollection = db.collection("users");
const classesCollection = db.collection("classes");
const usersClgSelectedCollection = db.collection("users-selected");
const paymentCollection = db.collection("student-payment");

app.get("/", (req, res) => {
	res.send("-----Assalamualaikum------");
});

// JWT Token
app.post("/jwt", (req, res) => {
	const user = req.body;
	const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1d",
	});
	res.send({ token });
});
// app.get("/users/admin/:email", verifyJWT, async (req, res) => {
// 	const email = req.params.email;

// 	if (req.decoded.email !== email) {
// 		res.send({ admin: false });
// 	}

// 	const query = { email: email };
// 	const user = await usersCollection.findOne(query);
// 	const result = { admin: user?.role === "admin" };
// 	res.send(result);
// });
app.get("/users/admin/:email", verifyJWT, async (req, res) => {
	const query = { email: req.params.email };
	const user = await usersCollection.findOne(query);
	const result = { admin: user?.role === "Admin" };
	res.send(result);
});

app.post("/users", async (req, res) => {
	const user = req.body;
	// Checking the user
	const query = { email: user.email };
	const existingUser = await usersCollection.findOne(query);
	if (existingUser) {
		return res.send({ message: "User already exists" });
	}

	const result = await usersCollection.insertOne(user);
	res.send(result);
});
app.patch("/users/role-update/:id", async (req, res) => {
	const id = req.params.id;
	const role = req.body.role;

	const query = { _id: new ObjectId(id) };
	const updateDoc = {
		$set: {
			role: role,
			roleModified: true,
		},
	};

	const result = await usersCollection.updateOne(query, updateDoc);
	res.send(result);
});

app.get("/allUsers", verifyJWT, async (req, res) => {
	const allUser = await usersCollection.find().toArray();
	res.send(allUser);
});

app.get("/all-instructor", async (req, res) => {
	const query = { role: "Instructor" };
	const instructor = await usersCollection.find(query).toArray();
	res.send(instructor);
});
app.get("/user/:email", async (req, res) => {
	const email = req.params.email;
	const query = { email: email };
	const result = await usersCollection.findOne(query);
	res.send(result);
});

app.get("/classes", verifyJWT, async (req, res) => {
	const query = { classStatus: "pending" };
	const classes = await classesCollection.find(query).toArray();
	res.send(classes);
});
// only admin approved classes
app.get("/all-classes", async (req, res) => {
	const query = { classStatus: "Approved" };
	const result = await classesCollection.find(query).toArray();
	res.send(result);
});
app.post("/classes", async (req, res) => {
	const classData = req.body;
	const classes = await classesCollection.insertOne(classData);
	res.send(classes);
});
app.patch("/classes-status/:id", async (req, res) => {
	const id = req.params.id;
	const clgStatus = req.body.status;

	const query = { _id: new ObjectId(id) };
	const updateDoc = {
		$set: {
			classStatus: clgStatus,
		},
	};

	const result = await classesCollection.updateOne(query, updateDoc);
	res.send(result);
});
app.patch("/feedback/:id", async (req, res) => {
	const id = req.params.id;
	const feedback = req.body;

	const query = { _id: new ObjectId(id) };
	const updateDoc = {
		$set: feedback,
	};

	const result = await classesCollection.updateOne(query, updateDoc);
	res.send(result);
});

app.get("/my-class", verifyJWT, async (req, res) => {
	const email = req.query.email;
	const query = { InstructorEmail: email };
	const myClass = await classesCollection.find(query).toArray();
	res.send(myClass);
});
app.delete("/delete-class/:classId", async (req, res) => {
	const classId = req.params.classId;
	console.log("class id -> ", classId);
	const result = await classesCollection.deleteOne({
		_id: new ObjectId(classId),
	});
	res.send(result);
});

// get populer classes based on students number
app.get("/popularClass", async (req, res) => {
	const popularClasses = await classesCollection
		.aggregate([
			{ $sort: { enrollClass: -1 } }, // Sort by enrolled number in descending order
			{ $limit: 6 }, // Get the top 5 classes with the highest enrollment
		])
		.toArray();
	res.send(popularClasses);
});

// get top 6 popular instructor for home page
app.get("/popularInstructor", async (req, res) => {
	const instructorList = await usersCollection
		.find({ role: "Instructor" })
		.limit(6)
		.toArray();

	// TODO: Popular Instructor Somethings error
	// const instructorList = await classesCollection
	// 	.aggregate([
	// 		{
	// 			$group: {
	// 				_id: "$email",
	// 				InstructorName: { $first: "$InstructorName" },
	// 				InstructorImg: { $first: "$InstructorImg" },
	// 				enrollClass: { $sum: "$enrollClass" },
	// 				totalEnrolled: { $sum: "$enrollClass" },
	// 			},
	// 		},
	// 		{
	// 			$sort: { totalEnrolled: -1 },
	// 		},
	// 		{
	// 			$limit: 6,
	// 		},
	// 	])
	// 	.toArray();

	res.send(instructorList);
});

// All Students
app.post("/selected", async (req, res) => {
	const selectedData = req.body;

	const query = {
		classId: selectedData.classId,
		studentEmail: selectedData.studentEmail,
	};
	const existingData = await usersClgSelectedCollection.findOne(query);
	if (existingData) {
		return res.send({ message: "already exists" });
	}

	const selectedOne = await usersClgSelectedCollection.insertOne(selectedData);
	res.send(selectedOne);
});
app.get("/my-selected/:email", verifyJWT, async (req, res) => {
	const email = req.params.email;
	const query = {
		studentEmail: email,
	};
	const result = await usersClgSelectedCollection.find(query).toArray();
	res.send(result);
});
app.delete("/delete-selected/:classId", async (req, res) => {
	const classId = req.params.classId;
	// console.log(classId);
	const result = await usersClgSelectedCollection.deleteOne({ classId });
	res.send(result);
});

// create payment intent
app.post("/create-payment-intent", verifyJWT, async (req, res) => {
	const { price } = req.body;
	const amount = price * 100;
	const paymentIntent = await stripe.paymentIntents.create({
		amount: amount,
		currency: "usd",
		payment_method_types: ["card"],
	});
	res.send({
		clientSecret: paymentIntent.client_secret,
	});
});

// payment related api
app.post("/payments", verifyJWT, async (req, res) => {
	const payment = req.body;
	console.log("payment -> ", payment);

	// Data Update classCollection
	const clgQuery = { _id: new ObjectId(payment.classId) };
	const clgCollection = await classesCollection.findOne(clgQuery);

	const AS = clgCollection.availableSeats - 1;
	const EC = clgCollection.enrollClass + 1;
	const updateDoc = {
		$set: {
			availableSeats: AS,
			enrollClass: EC,
		},
	};
	const ClgUpdateCollection = await classesCollection.updateOne(
		clgQuery,
		updateDoc
	);

	// payment history added
	const insertResult = await paymentCollection.insertOne(payment);

	// selected card delete
	const query = { classId: payment?.classId };
	const deleteResult = await usersClgSelectedCollection.deleteOne(query);
	console.log("deleteResult -> ", deleteResult);

	res.send({ ClgUpdateCollection, insertResult, deleteResult });
});
app.get("/payment-history/:email", verifyJWT, async (req, res) => {
	const email = req.params.email;
	const query = { studentEmail: email };
	const result = await paymentCollection.find(query).toArray();
	res.send(result);
});
app.get("/my-enroll-class/:email", verifyJWT, async (req, res) => {
	const email = req.params.email;
	const query = { studentEmail: email, enrolled: true };
	const result = await paymentCollection.find(query).toArray();
	res.send(result);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
