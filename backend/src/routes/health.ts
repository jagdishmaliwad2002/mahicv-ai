import { Router } from "express";
import { HealthCheckResponse } from "../lib/schemas.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "MahiCV.AI API is running" });
});

router.get("/health", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

export default router;
