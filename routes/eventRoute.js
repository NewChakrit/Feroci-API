const express = require("express");
const authenticate = require("../middlewares/authenticate");
const eventController = require("../controllers/eventController");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", eventController.getEvent);
router.post(
  "/",
  authenticate,
  upload.single("img"),
  eventController.createEvent
);
router.delete("/:id", authenticate, eventController.deleteEvent);

module.exports = router;
