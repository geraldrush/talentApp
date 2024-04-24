import express from "express";
import {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/", getRestaurants);
router.post("/", createRestaurant);
router.get("/:id", getRestaurant);
router.delete("/:id", deleteRestaurant);
router.patch("/:id", updateRestaurant);

export default router;
