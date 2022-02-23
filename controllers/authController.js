const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password.length < 6) {
      res
        .status(201)
        .json({ message: "this password should have more than 6 characters" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "password and confirm password did not match" });
    }

    const isEmail = emailFormat.test(email);
    if (isEmail) {
      const existUser = await User.findOne({
        where: { email: email },
      });

      if (existUser) {
        res.status(400).json({ message: "this email is already is used" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email: isEmail ? email : null,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isEmail = emailFormat.test(email);

    let user;
    if (isEmail) {
      user = await User.findOne({ where: { email: email } });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const { id, firstName, lastName, email: email1 } = user;

    res.status(200).json({
      token,
      user: { id, firstName, lastName, email1 },
    });
  } catch (err) {
    next(err);
  }
};
