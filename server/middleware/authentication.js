import jwt from "jsonwebtoken";

export default async function Authentication(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).send({ msg: "authentication error!" });
  }
}
