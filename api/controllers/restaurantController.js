import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a restaurant
export const createRestaurant = async (req, res) => {
  const { name, description, address, image } = req.body;
  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        description,
        address,
        image,
      },
    });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all restaurants
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get one restaurant by id
export const getRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id,
      },
    });
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a restaurant
export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, description, address, image } = req.body;
  try {
    const restaurant = await prisma.restaurant.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        address,
        image,
      },
    });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await prisma.restaurant.delete({
      where: {
        id,
      },
    });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
