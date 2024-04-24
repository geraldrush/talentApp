import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a notification
export const createNotification = async (req, res) => {
  const { type, message } = req.body;
  try {
    const notification = await prisma.notification.create({
      data: {
        type,
        message,
      },
    });
    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany();
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get one notification by id
export const getNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await prisma.notification.findUnique({
      where: {
        id,
      },
    });
    if (notification) {
      res.json(notification);
    } else {
      res.status(404).json({ error: "Notification not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a notification
export const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { type, message, status } = req.body;
  try {
    const notification = await prisma.notification.update({
      where: {
        id,
      },
      data: {
        type,
        message,
        status,
        updatedAt: new Date(),
      },
    });
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await prisma.notification.delete({
      where: {
        id,
      },
    });
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
