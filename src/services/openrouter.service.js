import axios from "axios";
import { prompts } from "../config/prompt.config.js";

/**
 * Sends a user prompt to OpenRouter using the Mistral-7B-Instruct model
 * and returns a structured JSON response extracted from the model output.
 */
export async function analyzePromptWithOpenRouter(prompt) {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "mistralai/mistral-7b-instruct",
      messages: [
        { role: "system", content: prompts.extractJson },
        { role: "user", content: prompt },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const raw = response.data.choices[0]?.message?.content || "";

  // Extract the first JSON block found in the output
  const match = raw.match(/{[\s\S]*}/);
  if (!match) {
    throw new Error("Response doesn't have a valid JSON structure.");
  }

  return JSON.parse(match[0]);
}
