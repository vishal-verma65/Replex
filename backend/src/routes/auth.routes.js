import { Router } from "express";
import { getMe, login, register, verifyEmail } from "../controllers/auth.controller.js";
import { loginValidator, registerValidation } from "../validators/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a user
 * @access public
 * @body {username, email, password}
 * @return {user}
 */
authRouter.post("/register", registerValidation, register);

/**
 * @route POST /api/auth/login
 * @desc login an user and return JTW token
 * @access private
 * @body {username/email, password}
 */
authRouter.post("/login", loginValidator, login)

/**
 * @route GET /api/auth/verify-email
 * @desc verify email of an user
 * @access public
 * @query {token}
 */
authRouter.get("/verify-email", verifyEmail)

/**
 * @route GET /api/auth/get-me
 * @desc returns details of a user 
 * @access private
 */
authRouter.get("/get-me",authUser, getMe)


export default authRouter;