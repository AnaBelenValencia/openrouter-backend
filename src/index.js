import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

import app from "./app.js";

// Define the server port from .env or fallback to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
