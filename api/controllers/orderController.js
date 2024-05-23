import prisma from "../utils/prisma.js";

// Create an order
export const createOrder = async (req, res) => {
  const {
    orderNumber,
    cart,
    userName,
    userEmail,
    userPhone,
    deliveryAddress,
    total,
  } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        orderNumber,
        cart,
        userName,
        userEmail,
        userPhone,
        deliveryAddress,
        total,
      },
    });
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get one order by id
export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Check if the provided status is valid
  if (!["PREPARING", "UNASSIGNED", "COLLECTED", "DELIVERED"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.delete({
      where: {
        id,
      },
    });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
