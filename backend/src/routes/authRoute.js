import express from "express";
import { registerUser, loginUser, getUserProfile, logout, userProfile } from "../controllers/authController.js";
import protect  from "../middlewares/authMiddleware.js";
import multer from "multer";


const router = express.Router();
const storage=multer.memoryStorage();
const upload=multer({storage});


router.post("/register",  registerUser);
router.post("/login", loginUser);
router.post("/profile/edit", protect, upload.single("image"), userProfile);
router.get("/profile", protect, getUserProfile);
router.post("/logout", logout);

export default router;
