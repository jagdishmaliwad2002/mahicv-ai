import { Router } from "express";
import healthRouter from "./health";
import aiRouter from "./ai";

const router = Router();

// ✅ EXPLICIT PATHS (NO CONFUSION)
router.use("/health", healthRouter);
router.use("/ai", aiRouter);

export default router;
