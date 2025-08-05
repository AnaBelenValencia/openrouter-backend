import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import app from "../src/app.js";

/**
 * Test suite for POST /api/ia
 * Verifies that the endpoint returns structured JSON for valid prompts,
 * and returns appropriate errors for missing input.
 */
describe("POST /api/ia", () => {
  test("should return structured JSON from valid prompt", async () => {
    const response = await request(app)
      .post("/api/ia")
      .send({
        prompt: "Se incendió mi auto frente a casa, nadie salió herido.",
      });

    // Expect success
    assert.strictEqual(response.statusCode, 200);

    // Expect all required keys and types
    assert.ok(response.body.date);
    assert.ok(response.body.location);
    assert.ok(response.body.description);
    assert.ok(typeof response.body.injuries === "boolean");
    assert.ok(typeof response.body.owner === "boolean");
    assert.ok(typeof response.body.complete === "boolean");
    assert.ok(typeof response.body.question === "string");
  });

  test("should return 400 when prompt is missing", async () => {
    const response = await request(app).post("/api/ia").send({});

    assert.strictEqual(response.statusCode, 400);
    assert.ok(response.body.error);
  });
});
