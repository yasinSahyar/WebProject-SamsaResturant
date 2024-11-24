import express from "express";
import path from "path";

const router = express.Router();

// Serve the frontend
router.get("/", (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
});

export default router;
