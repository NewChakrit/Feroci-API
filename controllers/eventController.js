const util = require("util");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { Op } = require("sequelize");
const { Event, User, sequelize } = require("../models");

const uploadPromise = util.promisify(cloudinary.uploader.upload);

exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json({ event });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    console.log(req.body);
    const { title, img, date, time, detail, location } = req.body;
    if (!title && !detail && !img && !time && !time && !location && !req.body) {
      res.status(400).json({ message: "title or detail or image is required" });
    }

    let result = {};
    if (req.file) {
      result = await uploadPromise(req.file.path);
      fs.unlinkSync(req.file.path);
    }

    const event = await Event.create({
      title,
      date,
      time,
      location,
      detail,
      img: result.secure_url,
      user_id: req.user.id,
    });

    console.log(event);
    res.status(201).json({ event });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const event = await Event.findOne({ where: { id } });

    if (!event) {
      return res.status(400).json({ message: "event not found" });
    }

    await Event.destroy({ where: { id } }, { transaction });
    await transaction.commit();

    res.status(204).json();
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};
