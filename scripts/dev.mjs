import { spawn } from "cross-spawn";

const runStep = (cmd, args) => {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit" });
    child.on("close", (code) => {
      if (code !== 0)
        reject(new Error(`${cmd} ${args.join(" ")} failed with code ${code}`));
      else resolve();
    });
  });
};

const runDetached = (cmd, args) => {
  const child = spawn(cmd, args, {
    detached: true,
    stdio: "ignore",
  });
  child.unref();
};

const main = async () => {
  try {
    await runStep("npm", ["run", "services:up"]);
    await runStep("npm", ["run", "services:wait:database"]);
    await runStep("npm", ["run", "migrations:up"]);

    const nextDev = spawn("npm", ["run", "next:dev"], { stdio: "inherit" });

    const stopServices = () => {
      console.log("\nStopping services...");
      nextDev.kill();
      runDetached("npm", ["run", "services:stop"]);
      process.exit(0);
    };

    process.on("SIGINT", stopServices);
    process.on("SIGTERM", stopServices);
    nextDev.on("close", stopServices);
  } catch (err) {
    console.error("Error during setup:", err);
    process.exit(1);
  }
};

main();
