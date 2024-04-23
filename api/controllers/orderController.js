import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

// Create an order
export const createOrder = async (req, res) => {
  const {
    orderNumber,
    cart,
    deliveryTime,
    userName,
    userEmail,
    userPhone,
    paymentToken,
    deliveryAddress,
    note,
    discount,
    total,
  } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        orderNumber,
        cart,
        deliveryTime,
        userName,
        userEmail,
        userPhone,
        paymentToken,
        deliveryAddress,
        note,
        discount,
        total,
        user: {
          connect: {
            email: userEmail,
          },
        },
      },
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
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
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    orderNumber,
    cart,
    deliveryTime,
    userName,
    userEmail,
    userPhone,
    paymentToken,
    deliveryAddress,
    note,
    discount,
    total,
  } = req.body;
  try {
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        orderNumber,
        cart,
        deliveryTime,
        userName,
        userEmail,
        userPhone,
        paymentToken,
        deliveryAddress,
        note,
        discount,
        total,
      },
    });
    res.json(order);
  } catch (error) {
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
    res.status(500).json({ error: "Something went wrong" });
  }
};
