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
    "<h1>This the home page and contents page</h1> <p>Welcome to the home page " +
      baseUrl +
      "\n" +
      "<p>Orders route is on " +
      baseUrl +
      "/orders</p>" + "<p>Categories route is "+ baseUrl +
      "/categories</p>" +  "<p>Menu route is "+ baseUrl +
      "/menu</p>"
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
      drinkName: "Chaw Burger",
      image: "burger.png",
      categoryId: 1,
    },
    {
      id: "12",
      drinkName: "Rockshandy",
      image: "pizza.png",
      categoryId: 3,
    },
    {
      id: "13",
      drinkName: "Drinks",
      image: "drink.png",
      categoryId: 3,
    },
  ];
  res.send(menu);
});

let orders = [
  {
    orderName: "Charles Smith",
    items: ["burger", "drinks"],
    isDelivery: true
  },
];

app.get("/orders", (req, res) => {
  res.send(orders);
});

app.post("/orders", (req, res) => {
  const order = req.body;

  orders.push({ ...order, id: uuidv4() });

  res.status(201).send(`Order with order number ${order.id} successfully created.`);
});

app.get("/orders", (req, res) => {
  let orders = [];
  res.send(orders);
});

app.get("/orders/:id", (req, res) => {
  const { id } = req.params;

  const foundOrder = orders.find((order)=> order.id === id);
  
  res.send(foundOrder);
});

app.delete('/orders/:id', (req, res) => {
  const { id } = req.params;

  orders = orders.filter((order) => order.id !== id);

  res.send(`Order with id ${id} deleted from the database`);

})

app.patch('/orders/:order', (req, res) => {
  const { id } = req.params;
  const { orderName, items, isDelivery} = req.body;
  const order = orders.find((order) => order.id === id);
  

if(orderName) {
  order.orderName = orderName;
}

if(items) {
  order.items = items;
}

if(isDelivery) {
  order.isDelivery = isDelivery;
}

res.send(`User with the id ${id} has been updated`);

})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
