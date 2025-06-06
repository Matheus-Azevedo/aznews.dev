import orchestrator from "tests/orchestrator";
import { beforeAll, describe, test, expect } from "@jest/globals";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.cleanDatabase();
});

const url = "http://localhost:3000/api/v1/migrations";

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response1 = await fetch(url, { method: "POST" });
        expect(response1.status).toBe(201);
        const responseBody1 = await response1.json();
        expect(Array.isArray(responseBody1)).toBe(true);
        expect(responseBody1.length).toBeGreaterThan(0);
      });
      test("For the second time", async () => {
        const response2 = await fetch(url, { method: "POST" });
        expect(response2.status).toBe(200);
        const responseBody2 = await response2.json();
        expect(Array.isArray(responseBody2)).toBe(true);
        expect(responseBody2.length).toBe(0);
      });
    });
  });
});
