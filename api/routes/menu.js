import express from "express";
import {
  createMenu,
  getMenus,
  getMenu,
  deleteMenu,
  updateMenu,
} from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getMenus);
router.post("/", createMenu);
router.get("/:id", getMenu);
router.delete("/:id", deleteMenu);
router.patch("/:id", updateMenu);

export default router;
