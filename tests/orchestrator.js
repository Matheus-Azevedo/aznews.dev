import retry from "async-retry";
import status from "statuses";

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

export default {
  waitForAllServices,
};
