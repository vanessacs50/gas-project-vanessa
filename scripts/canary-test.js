// scripts/canary-test.js
const http = require("http");

const TOTAL_REQUESTS = 100;
const CANARY_PERCENT = 0.1; // 10%

let mainHits = 0;
let canaryHits = 0;

function sendRequest() {
  // Decide whether this request goes to canary or main
  const isCanary = Math.random() < CANARY_PERCENT;
  const port = isCanary ? 3002 : 3001; // canary on 3002, main on 3001

  return new Promise((resolve) => {
    http.get(`http://localhost:${port}/health`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (isCanary) canaryHits++;
        else mainHits++;
        resolve();
      });
    }).on("error", () => resolve()); // ignore errors
  });
}

async function run() {
  console.log(`Sending ${TOTAL_REQUESTS} requests...`);
  for (let i = 0; i < TOTAL_REQUESTS; i++) {
    await sendRequest();
  }
  console.log(`Main hits: ${mainHits}`);
  console.log(`Canary hits: ${canaryHits}`);
  console.log(`Canary percentage observed: ${(canaryHits / TOTAL_REQUESTS) * 100}%`);
}

run();
