const fs = require("fs");
const { User } = require("../models/user");
const util = require("util");

exports.getme = (req, res, next) => {
  const { id, firstName, lastName, email, password, is_admin } = req.user;

  res
    .status(200)
    .json({ user: { id, firstName, lastName, email, password, is_admin } });
};
