import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import messageRoute from "./routes/message";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Thêm middleware CORS
app.use(cors({
  origin: 'http://localhost:3000', // URL của frontend
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
