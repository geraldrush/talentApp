import express from "express";
import {

createCategory,
getCategories,
getCategory,
deleteCategory,
updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.get("/:id", getCategory);
router.delete("/:id", deleteCategory);
router.patch("/:id", updateCategory);

export default router;
