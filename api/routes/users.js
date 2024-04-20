import express from "express";
import {
  createUser,
  getUsers,
  //getUser,
  // deleteUser,
  // patchUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
//router.get("/:id", getUser);
//router.delete("/:id", deleteUser);
//router.patch("/:id", patchUser);

export default router;
