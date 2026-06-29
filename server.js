const express = require("express");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const port = process.env.PORT || 3001;
const rootDir = __dirname;

app.use(express.static(rootDir));

app.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  const url = `http://localhost:${port}`;
  const command =
    process.platform === "win32"
      ? `start "" "${url}"`
      : process.platform === "darwin"
        ? `open "${url}"`
        : `xdg-open "${url}"`;

  exec(command, (error) => {
    if (error) {
      console.log(`Unable to open browser automatically: ${error.message}`);
    }
  });
});

module.exports = app;
