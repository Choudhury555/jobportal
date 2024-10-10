import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getAllApplicants, getAllApplicationsYouApplied, updateStatus } from "../contollers/application.controller.js";

const router  = express.Router();

router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/getallapplicationsyouapplied").get(isAuthenticated,getAllApplicationsYouApplied);
router.route("/:id/getallapplicants").get(isAuthenticated,getAllApplicants);
router.route("/updatestatus/:id/update").post(isAuthenticated,updateStatus);


export default router;
