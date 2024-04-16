import express from "express";
import { v4 as uuidv4 } from "uuid";
import { createOrder } from "../controllers/orderController.js";
import { getOrders } from "../controllers/orderController.js";
import { getOrder } from "../controllers/orderController.js";
import { deleteOrder } from "../controllers/orderController.js";
import { patchOrder } from "../controllers/orderController.js";

const router = express.Router();

let orders = [];

router.get("/", getOrders);
router.post("/", createOrder);
router.get("/:id", getOrder);
router.delete("/:id", deleteOrder);
router.patch("/:id", patchOrder);

export default router;
