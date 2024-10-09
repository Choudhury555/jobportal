import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAllJobs, getJobById, getJobsCreatedByAdmin, postJob } from "../contollers/job.controller.js";

const router  = express.Router();

router.route("/postjob").post(isAuthenticated,postJob);
router.route("/getalljobs").get(isAuthenticated,getAllJobs);
router.route("/getjobbyid/:id").get(isAuthenticated,getJobById);
router.route("/getjobscreatedbyadmin").get(isAuthenticated,getJobsCreatedByAdmin);

export default router;
