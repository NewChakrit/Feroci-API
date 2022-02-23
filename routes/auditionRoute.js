const express = require("express");
const authenticate = require("../middlewares/authenticate");
const auditionController = require("../controllers/auditionController");

const router = express.Router();

router.get("/", auditionController.getAudition);
router.post("", authenticate, auditionController.createAudition);
router.delete("/:id", authenticate, auditionController.deleteAudition);

module.exports = router;
