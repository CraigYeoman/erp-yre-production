require("express-async-errors");
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const fileURLToPath = require("url");

const vendorsRouter = require("./routes/vendors");
const jobTypeRouter = require("./routes/jobtype");
const customerRouter = require("./routes/customer");
const laborRouter = require("./routes/labor");
const partsRouter = require("./routes/parts");
const workOrdersRouter = require("./routes/workorders");
const accessoriesRouter = require("./routes/accessories");
const partCategoryRouter = require("./routes/partcategory");
const laborCategoryRouter = require("./routes/laborcategory");
const userRouter = require("./routes/user");

const app = express();
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const authenticateUser = require("./middleware/auth");

app.use(cors());
if (process.env.NODE_ENV !== "production") {
  app.use(logger("dev"));
}

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/erp/vendors", authenticateUser, vendorsRouter);
app.use("/api/v1/erp/jobtypes", authenticateUser, jobTypeRouter);
app.use("/api/v1/erp/customers", authenticateUser, customerRouter);
app.use("/api/v1/erp/labor", authenticateUser, laborRouter);
app.use("/api/v1/erp/parts", authenticateUser, partsRouter);
app.use("/api/v1/erp/workorders", authenticateUser, workOrdersRouter);
app.use("/api/v1/erp/accessories", authenticateUser, accessoriesRouter);
app.use("/api/v1/erp/partcategory", authenticateUser, partCategoryRouter);
app.use("/api/v1/erp/laborcategory", authenticateUser, laborCategoryRouter);
app.use("/api/v1/erp/user", userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Set up mongoose connection
const port = process.env.port || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = app;
