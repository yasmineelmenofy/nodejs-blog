import express from "express";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import cookieParser from "cookie-parser";
import expressLayout from "express-ejs-layouts";
import methodOverride from "method-override";

import homeRoutes from "./server/routes/homeRoutes";
import adminRoutes from "./server/routes/adminRoutes";
import { connectDB } from "./server/config/db";
import { isActiveRoute } from "./server/helpers/routeHelpers";
import { errorMiddleware } from "./server/middleware/error.middleware";

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use(expressLayout);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.locals.isActiveRoute = isActiveRoute;

app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});

app.use("/", homeRoutes);
app.use("/", adminRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
