const { exec } = require("node:child_process");

function checkPostgres() {
  exec(
    "docker exec postgres-development pg_isready --host localhost",
    (_error, stdout) => {
      if (stdout.search("accepting connections") === -1) {
        process.stdout.write(".");
        checkPostgres();
        return;
      }
      console.log("\nPostgreSQL is ready and accepting connections!");
    },
  );
}

process.stdout.write("\nWaiting for PostgreSQL to become available");
checkPostgres();
