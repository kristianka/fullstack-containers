/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "express-async-errors";
import { PORT, MONGODB_URI } from "./utils/config.js";
import blogRouter from "./controllers/blogs.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import testingRouter from "./controllers/testingRouter.js";
import { getTokenFromReq, errorHandler, unknownEndpoint } from "./utils/middleware.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

// Connect to the database
mongoose.connect(MONGODB_URI)
  .then(res => {
    console.log("Success");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
    console.log("uri length:", MONGODB_URI.length);
    process.exit(1);
  });

app.use(getTokenFromReq);

if (process.env.NODE_ENV === "test") {
  console.log("Testing mode activated");
  app.use("/api/testing", testingRouter);
}

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);

// health
app.get("/api/health", (req, res) => {
  res.status(200).send("Everything is fine :)");
});

// app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;