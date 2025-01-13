import database from "infra/database";
import orchestrator from "tests/orchestrator";
import { beforeAll, describe, test, expect } from "@jest/globals";

async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await cleanDatabase();
});

const url = "http://localhost:3000/api/v1/migrations";

describe("POST /api/v1/migrations", () => {
  test("should return 200", async () => {
    const response1 = await fetch(url, { method: "POST" });
    expect(response1.status).toBe(201);
    const responseBody1 = await response1.json();
    expect(Array.isArray(responseBody1)).toBe(true);
    expect(responseBody1.length).toBeGreaterThan(0);

    const response2 = await fetch(url, { method: "POST" });
    expect(response2.status).toBe(200);
    const responseBody2 = await response2.json();
    expect(Array.isArray(responseBody2)).toBe(true);
    expect(responseBody2.length).toBe(0);
  });
});
