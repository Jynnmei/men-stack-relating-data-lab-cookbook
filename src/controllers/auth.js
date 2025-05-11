import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import Auth from "../models/Auth.js";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const auth = await Auth.findOne({ username: req.body.username });
    if (auth) {
      return res
        .status(400)
        .json({ status: "error", msg: "duplicate username" });
    }

    const hash = await bcrypt.hash(req.body.password, 12);

    const newAuth = await Auth.create({
      username: req.body.username,
      hash,
    });

    const newUser = await User.create({
      _id: newAuth._id,
      username: newAuth.username,
      pantry: [],
    });

    res.json({ status: "ok", msg: "auth created" });
    console.log("Auth ID:", newAuth._id);
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

export const login = async (req, res) => {
  try {
    const auth = await Auth.findOne({ username: req.body.username });
    if (!auth) {
      return res.status(400).json({ status: "error", msg: "not authorised" });
    }

    console.log("Generated User ID (auth._id):", auth._id);

    const result = await bcrypt.compare(req.body.password, auth.hash);
    if (!result) {
      console.error("username or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = { username: auth.username, id: auth._id };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ status: "error", msg: "login failed" });
  }
};

export const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = {
      username: decoded.username,
      id: decoded.id,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "refreshing token error" });
  }
};
