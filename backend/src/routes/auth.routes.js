import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { registerValidation } from "../validators/auth.validator.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a user
 * @access public
 * @body {username, email, password}
 * @return {user}
 */
authRouter.post("/register", registerValidation, register);

export default authRouter;