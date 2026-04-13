import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

const port = process.env.PORT || 8787;

app.listen(port, () => {
  console.log(`API listening on ${port}`);
});