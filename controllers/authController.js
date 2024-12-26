const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { request } = require("express");

let refreshTokens = [];
const authController = {
  registerUser: async (req, res) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      //create user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      //save user
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  //generate token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30d" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        admin: user.admin,
        },
        process.env.JWT_REFRESH_KEY,
        {expiresIn: "365d"},
      );
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        })
        const { password, ...others } = user._doc;
        return res.status(200).json({...others, accessToken});
      }

      return res.status(401).json({ message: "Invalid username or password" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  requestRefreshToken: async (req, res) => {
    //take refresh token from user
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: "refresh token is not valid" });
      }
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
          console.log(err);
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        //create new access token, refresh token
        const newaccessToken = authController.generateAccessToken(user);
        const newRefreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        })
        return res.status(200).json({ accessToken: newaccessToken });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  logoutUser: async(req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
    res.status(200).json("Logout successfully");
  }
};

//store refresh token
//(array of refresh token) refreshTokens
//-> cookie

module.exports = authController;
