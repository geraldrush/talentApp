import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.js";
import menuRoutes from "./routes/menu.js";
import categoryRoutes from "./routes/category.js";
import favoriteRoutes from "./routes/favorite.js";
import notificationRoutes from "./routes/notification.js";
import orderRoutes from "./routes/order.js";
import restaurantRoutes from "./routes/restaurant.js";

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

app.get("/", (req, res) => {
  const baseUrl = req.protocol + "://" + req.get("host");
  res.send(
    "<h1>This the home page and contents page</h1> <p>Welcome to the home page " +
      baseUrl +
      "\n" +
      "<p>Orders route is on " +
      baseUrl +
      "/orders</p>" +
      "<p>Categories route is " +
      baseUrl +
      "/categories</p>" +
      "<p>Menu route is " +
      baseUrl +
      "/menu</p>"
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
