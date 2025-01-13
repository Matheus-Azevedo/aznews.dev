import orchestrator from "tests/orchestrator";
import { beforeAll, describe, test, expect } from "@jest/globals";

const url = "http://localhost:3000/api/v1/status";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  test("should return 200", async () => {
    const response = await fetch(url);
    expect(response.status).toBe(200);
  });

  test("Should return a JSON with updated_at", async () => {
    const response = await fetch(url);
    const responseBody = await response.json();
    const updatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toBe(updatedAt);
  });

  test("Should return a JSON with database information - Version", async () => {
    const response = await fetch(url);
    const responseBody = await response.json();
    expect(responseBody.dependencies.database.version).toEqual("16.0");
  });

  test("Should return a JSON with database information - Max Connections", async () => {
    const response = await fetch(url);
    const responseBody = await response.json();
    expect(responseBody.dependencies.database.max_connections).toEqual(100);
  });

  test("Should return a JSON with database information - Used Connections", async () => {
    const response = await fetch(url);
    const responseBody = await response.json();
    expect(responseBody.dependencies.database.openedConnections).toEqual(1);
  });
});
