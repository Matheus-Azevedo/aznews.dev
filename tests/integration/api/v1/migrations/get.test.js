import database from "infra/database";
import orchestrator from "tests/orchestrator";

async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await cleanDatabase();
});

const url = "http://localhost:3000/api/v1/migrations";

describe("GET /api/v1/migrations", () => {
  test("should return 200", async () => {
    const response = await fetch(url);
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
  });
});
