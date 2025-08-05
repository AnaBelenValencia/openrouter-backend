import express from "express";
import { analyzePromptWithOpenRouter } from "../services/openrouter.service.js";

const router = express.Router();

/**
 * @route POST /api/ia
 * @desc Receives a paragraph-style input and returns a structured JSON
 * @access Public
 */
router.post("/", async (req, res) => {
  const { prompt } = req.body;

  // Validate input
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Process the input using the OpenRouter API
    const json = await analyzePromptWithOpenRouter(prompt);

    // Return the structured JSON response
    res.json(json);
  } catch (err) {
    console.error("Error:", err.message);

    // Return generic error if something goes wrong
    res.status(500).json({ error: "Failed to generate JSON" });
  }
});

export default router;
