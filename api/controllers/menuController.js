import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export const createMenu = async (req, res) => {
  const {
    title,
    shortDescr,
    longDescr,
    price,
    sellingPrice,
    image,
    prepType,
    onPromo,
    category,
  } = req.body;
  try {
    const menu = await prisma.menu.create({
      data: {
        title,
        shortDescr,
        longDescr,
        price,
        sellingPrice,
        image,
        prepType,
        onPromo,
        category,
      },
    });
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getMenus = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany();
    res.json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.menu.delete({
      where: {
        id,
      },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateMenu = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    shortDescr,
    longDescr,
    price,
    sellingPrice,
    image,
    prepType,
    onPromo,
    category,
  } = req.body;
  try {
    const updatedMenu = await prisma.menu.update({
      where: {
        id,
      },
      data: {
        title,
        shortDescr,
        longDescr,
        price,
        sellingPrice,
        image,
        prepType,
        onPromo,
        category,
      },
    });
    res.json(updatedMenu);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const getMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await prisma.menu.findUnique({
      where: {
        id,
      },
    });
    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
