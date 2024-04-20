import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.js";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 5000;

// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());
app.use("/users", usersRoutes);

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
