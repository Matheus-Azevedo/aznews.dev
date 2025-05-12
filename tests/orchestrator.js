import retry from "async-retry";
import status from "statuses";
import database from "infra/database";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      minTimeout: 1000,
      onRetry: (error, attempt) => {
        console.log(`Attempt ${attempt}: ${error.message}`);
      },
    });

    async function fetchStatusPage() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/status");
        if (response.status !== status("OK")) {
          throw new Error(`unexpected status code: ${response.status}`);
        }
      } catch (error) {
        throw new Error(`Failed to fetch status page - ${error.message}`);
      }
    }
  }
}

async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

export default {
  waitForAllServices,
  cleanDatabase,
};
