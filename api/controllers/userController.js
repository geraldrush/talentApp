// user.controller.js
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { name, email, emailVerified, image, role } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        emailVerified,
        image,
        role,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
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
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, emailVerified, image, role } = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        emailVerified,
        image,
        role,
      },
    });
    res.json(user);
  } catch (error) {
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
    res.json(`User with is ${id} deleted`);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
