const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY || "verystrongsecretpassword",
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findOne({ where: { id: payload.id } });
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  })
);
