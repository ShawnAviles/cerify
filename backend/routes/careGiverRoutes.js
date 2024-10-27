import express from "express";
import caregiverController from "../controllers/caregiverController.js";

const router = express.Router();

router.route("/login").post(caregiverController.login);

router.route("/signup").post(caregiverController.signup);

router.route("/updateProfile").post(caregiverController.updateProfile);

router.route("/updatePassword").post(caregiverController.updatePassword);

router.route("/updateStats").post(caregiverController.updateStats);

router.route("/getInfo").get(caregiverController.getInfo);

export default router;