import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a user
export const createUser = async (req, res) => {
  const { name, email, image } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        image,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get one user by id
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, image, role } = req.body;

  // Check if the provided role is valid
  if (!["USER", "ADMIN", "DELIVERY"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        image,
        role,
      },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
