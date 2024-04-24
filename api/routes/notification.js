import express from "express";
import {

createNotification,
getNotifications,
getNotification,
deleteNotification,
updateNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getNotifications);
router.post("/", createNotification);
router.get("/:id", getNotification);
router.delete("/:id", deleteNotification);
router.patch("/:id", updateNotification);

export default router;
