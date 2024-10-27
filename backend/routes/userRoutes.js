import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.route("/login").post(userController.login);

router.route("/signup").post(userController.signup);

router.route("/updateProfile").post(userController.updateProfile);

router.route("/updatePassword").post(userController.updatePassword);

router.route("/updateStats").post(userController.updateStats);

router.route("/getInfo").get(userController.getInfo);

export default router;