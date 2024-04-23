import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a favorite
export const createFavorite = async (req, res) => {
  const { userEmail, menu } = req.body;
  try {
    const favorite = await prisma.favorite.create({
      data: {
        userEmail,
        menu,
        user: {
          connect: {
            email: userEmail,
          },
        },
      },
    });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all favorites
export const getFavorites = async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get one favorite by id
export const getFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    const favorite = await prisma.favorite.findUnique({
      where: {
        id,
      },
    });
    if (favorite) {
      res.json(favorite);
    } else {
      res.status(404).json({ error: "Favorite not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a favorite
export const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { userEmail, menu } = req.body;
  try {
    const favorite = await prisma.favorite.update({
      where: {
        id,
      },
      data: {
        userEmail,
        menu,
      },
    });
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete a favorite
export const deleteFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    const favorite = await prisma.favorite.delete({
      where: {
        id,
      },
    });
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
