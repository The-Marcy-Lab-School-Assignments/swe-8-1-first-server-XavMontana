// index.js
const express = require("express");
const app = express();
const path = require("path");

const filePath = path.join(__dirname, "../apiUse/dist");
const serveStatic = express.static(filePath);

// controllers
const servePic = (req, res) => {
  res.send({
    src: "https://tse4.mm.bing.net/th?id=OIP.s-R87WDxhevCNBYvLzNnaQAAAA&pid=Api&P=0&h=220",
  });
};

const serveJoke = (req, res) => {
  res.send({
    setup: "If Shakespeare wrote a joke about Marcy, what would it be called?",
    punchline: "A fellow",
  });
};

const serveRoll = (req, res) => {
  const { quantity } = req.query;
  const length = Number(quantity) > 0 ? Number(quantity) : 1;
  const rolls = [];
  for (let i = 0; i < length; i++) {
    const roll = Math.ceil(Math.random() * 6);
    rolls.push(roll);
  }
  res.send(rolls);
};

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(serveStatic); // Serve static public/ content

// endpoints
app.get("/api/picture", servePic);
app.get("/api/joke", serveJoke);
app.get("/api/rollDie", serveRoll);

// run the server application on port 8080 of the current host (http://localhost during development)

const port = 8080;
app.listen(port, () => {
  console.log(`listening at this port: http://localhost:${port}`);
});
