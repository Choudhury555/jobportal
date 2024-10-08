import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../contollers/company.controller.js";

const router  = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/getcompany").get(isAuthenticated,getCompany);
router.route("/getcompany/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,updateCompany);

export default router;
