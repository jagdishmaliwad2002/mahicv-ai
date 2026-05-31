import { Router } from "express";

const router = Router();

// ✅ ROOT ONLY
router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
