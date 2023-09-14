const jwt = require("jsonwebtoken");
const usersService = require("../services/users.service");
module.exports.isAdmin = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1].trim();
    console.log(token);
    let result = jwt.verify(token, process.env.TOKEN_SECRET);
    let { id } = result.data;
    let [user] = await usersService.findOne(id);
    if (+user[0].role === 1) {
      next();
    } else {
      res.json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};
