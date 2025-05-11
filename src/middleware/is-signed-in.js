import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ status: "error", msg: "unauthorised user" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      console.log("Decoded token:", decoded);
      next();
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ status: "error", msg: "not authorised" });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "forbidden route" });
  }
};
