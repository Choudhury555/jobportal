import express from "express"
import { login, logout, register, updateProfile } from "../contollers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router  = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/profile/update").put(isAuthenticated,singleUpload,updateProfile);
router.route("/logout").get(logout);

export default router;
