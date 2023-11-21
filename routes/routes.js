import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/controller_refreshtoken.js";
import { Register, Login, Logout } from "../controllers/controller_auth.js";
import { getAllUser, getUserById } from "../controllers/controller_user.js";
import { getAllKuli, getKuliById } from "../controllers/controller_kuli.js";
import { getUserSuka, postUserSuka, deleteUserSuka } from "../controllers/controller_user_suka.js";

const router = express.Router();

// Authentication Routes
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.post('/logout', Logout);

// User Routes
router.get('/users', getAllUser);
router.get('/users/:id', getUserById);

// Kuli Routes
router.get("/kuli", getAllKuli);
router.get("/kuli/:id", getKuliById);

// User Suka Routes
router.get("/users/:user_id/disukai", getUserSuka);
router.post("/users/:user_id/disukai", verifyToken, postUserSuka);
router.delete("/users/:user_id/disukai/:kuli_id", verifyToken, deleteUserSuka);

export default router;