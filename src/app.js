import express from "express";
import cors from "cors";
import iaRoutes from "./routes/ia.routes.js";

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Register the AI-related routes under /api/ia
app.use("/api/ia", iaRoutes);

export default app;
