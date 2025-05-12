import orchestrator from "tests/orchestrator";
import { beforeAll, describe, test, expect, beforeEach } from "@jest/globals";

const url = "http://localhost:3000/api/v1/status";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.cleanDatabase();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    describe("Retrieving information about the API status", () => {
      let response;
      let responseBody;

      beforeEach(async () => {
        response = await fetch(url);
        responseBody = await response.json();
      });

      test("should return a specific status code", async () => {
        expect(response.status).toBe(200);
      });

      test("Should return a JSON with updated_at", async () => {
        const updatedAt = new Date(responseBody.updated_at).toISOString();
        expect(responseBody.updated_at).toBe(updatedAt);
      });

      test("Should return a JSON with database information - Version", async () => {
        expect(responseBody.dependencies.database.version).toEqual("16.0");
      });

      test("Should return a JSON with database information - Max Connections", async () => {
        expect(responseBody.dependencies.database.max_connections).toEqual(100);
      });

      test("Should return a JSON with database information - Used Connections", async () => {
        expect(responseBody.dependencies.database.openedConnections).toEqual(1);
      });
    });
  });
});
