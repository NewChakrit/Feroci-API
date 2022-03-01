const { Op } = require("sequelize");
const { Performance } = require("../models");
const util = require("util");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const uploadPromise = util.promisify(cloudinary.uploader.upload);

exports.getPerformance = async (req, res, next) => {
  try {
    const performance = await Performance.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json({ performance });
  } catch (err) {
    next(err);
  }
};

exports.editPerformance = async (req, res, next) => {
  try {
    const { title, detail } = req.body;
    const { id } = req.params;

    if (!title && !detail && !req.body) {
      return res.status(400).json({ message: "title and detail not found" });
    }

    const performance = await Performance.update(
      {
        title,
        detail,
      },
      {
        where: {
          id,
          user_id: req.user.id,
        },
      }
    );

    const performances = await Performance.findOne({
      where: {
        id,
        user_id: req.user.id,
      },
    });

    res.status(201).json({ performances });
  } catch (err) {
    console.log(err);
  }
};

exports.createPerformance = async (req, res, next) => {
  try {
    console.log(req.body);
    const { title, detail, img } = req.body;
    if (!title && !detail && !req.file) {
      res.status(400).json({ message: "title or image is required" });
    }

    let result = {};
    if (req.file) {
      result = await uploadPromise(req.file.path);
      fs.unlinkSync(req.file.path);
    }

    const performance = await Performance.create({
      title,
      detail,
      img,
      user_id: req.user.id,
    });

    res.status(201).json({ performance });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deletePerformance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const performance = await Performance.findOne({ where: { id } });

    if (!performance) {
      return res.status(400).json({ message: "performance not found" });
    }

    await performance.destroy();
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
