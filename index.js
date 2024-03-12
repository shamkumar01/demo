const express = require("express");
const app = express();
const connectDb = require("./database/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

connectDb();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api", productRouter);
app.use("/api", userRouter);

const port = 4000;
app.listen(port, () => {
  console.log(`server is running on ${port} port`);
});
