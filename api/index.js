import express from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.js";
import menuRoutes from "./routes/menu.js";
import categoryRoutes from "./routes/category.js";
import favoriteRoutes from "./routes/favorite.js";
import notificationRoutes from "./routes/notification.js";
import orderRoutes from "./routes/order.js";
import restaurantRoutes from "./routes/restaurant.js";
import redisStore from "./utils/redis.js";
import authRoutes from "./routes/auth.js";
import { __prod__ } from "./utils/constants.js";

const app = express();
const port = 5000;

// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());

// Initialize session storage.
app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "lax",
      secure: __prod__,
    },
  })
);

// Initialize Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

// Route handlers
app.use("/users", usersRoutes);
app.use("/menu", menuRoutes);
app.use("/categories", categoryRoutes);
app.use("/favorite", favoriteRoutes);
app.use("/notifications", notificationRoutes);
app.use("/orders", orderRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<><><> API is running <><><>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
