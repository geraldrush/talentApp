import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 5000;
import { v4 as uuidv4 } from "uuid";

// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const baseUrl = req.protocol + "://" + req.get("host");
  res.send(
    "Welcome to the home page" +
      baseUrl +
      "\n" +
      `Orders route is on  ${baseUrl}/orders`
  );
});

app.get("/categories", (req, res) => {
  const categories = [
    {
      id: "1",
      name: "Burgers",
      image: "burger.png",
    },
    {
      id: "2",
      name: "Pizza",
      image: "pizza.png",
    },
    {
      id: "3",
      name: "Drinks",
      image: "drink.png",
    },
  ];
  res.send(categories);
});

app.get("/menu", (req, res) => {
  let menu = [
    {
      id: "10",
      name: "Chaw Burger",
      image: "burger.png",
      categoryId: 1,
    },
    {
      id: "12",
      name: "Rockshandy",
      image: "pizza.png",
      categoryId: 3,
    },
    {
      id: "13",
      name: "Drinks",
      image: "drink.png",
      categoryId: 3,
    },
  ];
  res.send(menu);
});

const orderId = uuidv4();
let orders = [
  {
    name: "Charles Smith",
    items: ["burger", "drinks"],
    isTakeAway: true,
    id: "2c866df7-8222-4d2c-931f-1286393e4544",
  },
];

app.get("/orders", (req, res) => {
  res.send(orders);
});

app.post("/orders", (req, res) => {
  const order = req.body;

  orders.push({ ...order, id: orderId });

  res.status(201).send(`Order with ${orderId} successfully created.`);
});

app.get("/orders", (req, res) => {
  let orders = [];
  res.send(orders);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
