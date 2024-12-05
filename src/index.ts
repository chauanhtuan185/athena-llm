import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import messageRoute from "./routes/message";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const PORT_FRONT_END = process.env.PORT || 3000;

// Add CORS middleware
app.use(cors({
  origin: `http://localhost:${PORT_FRONT_END}`, // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Routes
app.use(messageRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
