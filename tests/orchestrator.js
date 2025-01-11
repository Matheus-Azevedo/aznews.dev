import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      minTimeout: 1000,
    });

    async function fetchStatusPage(_bail, tryNumber) {
      console.log(`Attempt ${tryNumber} to fetch status page`);
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw new Error("Status page is not available");
      }
    }
  }
}

export default {
  waitForAllServices,
};
