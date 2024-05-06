import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.js";
import menuRoutes from "./routes/menu.js";
import categoryRoutes from "./routes/category.js";
import favoriteRoutes from "./routes/favorite.js";
import notificationRoutes from "./routes/notification.js";
import orderRoutes from "./routes/order.js";
import restaurantRoutes from "./routes/restaurant.js";
import redisStore from "./utils/redis.js";

const app = express();
const port = 5000;

// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());
app.use("/users", usersRoutes);
app.use("/menu", menuRoutes);
app.use("/categories", categoryRoutes);
app.use("/favorite", favoriteRoutes);
app.use("/notifications", notificationRoutes);
app.use("/orders", orderRoutes);
app.use("/restaurants", restaurantRoutes);

// Initialize session storage.
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: "keyboard cat",
  })
);

app.get("/", (req, res) => {
  res.send("<><><> API is running <><><>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
