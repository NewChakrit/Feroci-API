const util = require("util");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { Event, sequelize } = require("../models");

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
    const { title, img, date, time, detail, location } = req.body;
    if (!title && !img && !date && !time && !detail && !location && !req.body) {
      res.status(400).json({ message: "event is required" });
    }

    let result = {};
    if (!req.file) {
      return res.status(400).json({ massage: "img is requried" });
    }

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
    console.log(err.message);
    next(err);
  }
};

exports.editEvent = async (req, res, next) => {
  try {
    const { title, img, date, time, detail, location } = req.body;
    const { id } = req.params;

    if (!title && !img && !date && !time && !detail && !location && !req.body) {
      res.status(400).json({ message: "event is required" });
    }

    let result = {};
    if (!req.file) {
      return res.status(400).json({ massage: "img is requried" });
    }

    if (req.file) {
      result = await uploadPromise(req.file.path);
      fs.unlinkSync(req.file.path);
    }

    const event = await Event.update(
      {
        title,
        date,
        time,
        location,
        detail,
        img: result.secure_url,
      },
      {
        where: {
          id,
          user_id: req.user.id,
        },
      }
    );
    const events = await Event.findOne({
      where: {
        id,
        user_id: req.user.id,
      },
    });

    res.status(201).json({ events });
  } catch (err) {
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

// exports.deleteEvent = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const result = await Post.destroy({
//       where: {
//         id,
//         userId: req.user.id,
//       },
//     });
//     if (result === 0) {
//       res.status(400).json({ message: "cannot delete todo" });
//     }
//     res.status(204).json();
//   } catch (err) {
//     next(err);
//   }
// };
