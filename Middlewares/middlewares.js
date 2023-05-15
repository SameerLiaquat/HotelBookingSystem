const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const verifyToken = (req, res, next) => {
  // const {token} = req.headers
  const token = req.headers["token"];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(400).send({ message: "Invalid token", error: err });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(400).send({ message: "Invalid token" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.decoded.role == "admin") {
    next();
  } else {
    res.status(400).send({ message: "Unauthorized" });
  }
};

const verifyPropertyDealer = (req, res, next) => {
  if (req.decoded.role == "dealer") {
    next();
  } else {
    res.status(400).send({ message: "Unauthorized" });
  }
};

const middlewares = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      let filePath = Date.now() + "-" + file.originalname;
      cb(null, filePath);
      if (!req.body.file) {
        req.body.file = [];
      }
      req.body.file.push(filePath);
    },
  }),
}).array("file", 130);

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyPropertyDealer,
  middlewares,
};
