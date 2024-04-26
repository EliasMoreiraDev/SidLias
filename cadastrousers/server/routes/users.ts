import express from "express";
import { addUser } from "../controls/user";

const router = express.Router()

router.post("/", addUser)



export default router