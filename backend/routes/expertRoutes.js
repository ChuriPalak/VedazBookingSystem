import express from "express";
import { getExperts } from "../controllers/expertController.js";

const router = express.Router();

router.get("/", getExperts);

export default router;