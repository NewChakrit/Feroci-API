const { Audition } = require("../models");

exports.getAudition = async (req, res, next) => {
  try {
    const audition = await Audition.findAll({
      order: [["id", "DESC"]],
      limit: 1,
    });

    res.status(200).json({ audition });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.createAudition = async (req, res, next) => {
  try {
    const { season, year, detail } = req.body;

    if (!season && !year && !detail && !req.file) {
      res.status(400).json({ message: "title is required" });
    }

    const audition = await Audition.create({
      season,
      year,
      detail,
      user_id: req.user.id,
    });

    res.status(201).json({ audition });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteAudition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const audition = await Audition.findOne({ where: { id } });

    if (!audition) {
      return res.status(400).json({ message: "audition not found" });
    }

    await audition.destroy();
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
