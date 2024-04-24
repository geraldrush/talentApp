import express from "express";
import {
  createFavorite,
  getFavorites,
  getFavorite,
  deleteFavorite,
  updateFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.get("/", getFavorites);
router.post("/", createFavorite);
router.get("/:id", getFavorite);
router.delete("/:id", deleteFavorite);
router.patch("/:id", updateFavorite);

export default router;
