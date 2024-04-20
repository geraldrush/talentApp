// user.controller.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createUser(req, res) {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Define other controller functions for updating, deleting, etc.

export { createUser, getUsers };
