require("dotenv").config();
const express = require("express");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const connect = require("./DB/db.config");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./Routes/authRoute");
const categoryRouter = require("./Routes/categoryRoute");
const productRouter = require("./Routes/productRoute");

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const { isTokenValid } = require("./Utils");
const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("./errors");

const app = express();

app.use(helmet());
app.options("*", cors());

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use(morgan("tiny"));

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.get("/", (req, res) => {
  return res.send("<h2>E commerce API</h2>");
});

app.get("/session", (req, res) => {
  let token = req.signedCookies.authToken;
  if (token) {
    try {
      const { fullName, userId, avatar, email } = isTokenValid({ token });
      return res
        .status(StatusCodes.OK)
        .json({ token, fullName, userId, email, avatar });
    } catch (error) {
      console.log(error);
      throw new CustomAPIError.UnauthenticatedError("Authentication Invaild");
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Not logined" });
  }
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 8080;
function start() {
  app.listen(port, async () => {
    try {
      await connect(process.env.MONGO_URI);
    } catch (error) {
      console.log(error);
    }
    console.log(`My port is running on ${port}`);
  });
}
start();

async function populateDB() {
  const mockData = require("./products.json");

  await Product.create(mockData);
  console.log(`Success !!`);
  process.exit(0);
  try {
  } catch (error) {
    console.log(error);
  }
}
