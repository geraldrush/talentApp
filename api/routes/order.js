import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.get("/:id", getOrder);
router.delete("/:id", deleteOrder);
router.patch("/:id", updateOrder);

export default router;
