import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// import session from "express-session";
import userRouter from "./routes/userRouter.js";
import newsRouter from "./routes/newsRouter.js";
import groupsRouter from "./routes/groupsRouter.js";
import marketRouter from "./routes/marketRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Connect to MongoDB
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
const URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(URI)
  .then(() => console.log(`MongoDB connected`))
  .catch((error) => console.error('Database connection error:', error));

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.set("trust proxy", 1);

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://kiez.onrender.com",
      // Add other allowed origins if necessary
    ],
    credentials: true,
    methods: "GET, POST, PATCH, PUT, DELETE",
    optionsSuccessStatus: 204,
  })
);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));

// Routes
app.use("/", userRouter);
app.use("/", newsRouter);
app.use("/", groupsRouter);
app.use("/", marketRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Error Handling for Database Connection:
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Enhanced Logging Example:
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
