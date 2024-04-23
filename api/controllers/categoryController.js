import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a category
export const createCategory = async (req, res) => {
  const { title, desc, img } = req.body;
  try {
    const category = await prisma.category.create({
      data: {
        title,
        desc,
        img,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get one category by id
export const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title, desc, img } = req.body;
  try {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        title,
        desc,
        img,
      },
    });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
