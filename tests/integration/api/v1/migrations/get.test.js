import database from "infra/database";
import orchestrator from "tests/orchestrator";
import { beforeAll, describe, test, expect, beforeEach } from "@jest/globals";

async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await cleanDatabase();
});

const url = "http://localhost:3000/api/v1/migrations";

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Retrieving information about the migrations", () => {
      let response;
      let responseBody;

      beforeEach(async () => {
        response = await fetch(url);
        responseBody = await response.json();
      });

      test("Should return a specific status code", () => {
        expect(response.status).toBe(200);
      });

      test("Should return a specific structure", () => {
        expect(Array.isArray(responseBody)).toBe(true);
      });

      test("Should return a non-empty structure", () => {
        expect(responseBody.length).toBeGreaterThan(0);
      });
    });
  });
});
