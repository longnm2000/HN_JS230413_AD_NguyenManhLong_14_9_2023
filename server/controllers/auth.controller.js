const authService = require("../services/auth.service");
module.exports.signup = async (req, res) => {
  let { name, email, password } = req.body;
  try {
    await authService.signup(name, email, password);
    res.status(201).json({
      message: "Sign up successfully",
      status: 201,
    });
  } catch (error) {
    console.error("Error while signing up:", error);
    res.json({
      message: "Failed to sign up",
      error: error.message,
      status: 500,
    });
  }
};

module.exports.signin = async (req, res) => {
  let { email, password } = req.body;
  try {
    let result = await authService.signin(email, password);
    res.json(result);
  } catch (error) {
    res.json({
      message: "Failed to sign in",
      error: error.message,
      status: 500,
    });
  }
};
