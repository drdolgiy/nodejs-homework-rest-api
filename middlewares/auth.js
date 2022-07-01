const createErrors = require("http-errors");
const { authUser } = require("../services/auth.services");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(createErrors(401));
  }

  const user = await authUser(token);
  if (!user || !user.token) {
    next(createErrors(401));
  }
  req.user = user;
  next();
};

module.exports = {
  auth,
};
