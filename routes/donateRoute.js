const express = require("express");
const donateController = require("../controllers/donateController");

const router = express.Router();

router.post("", donateController.createDonate);

module.exports = router;
