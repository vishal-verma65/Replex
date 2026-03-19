import {Router} from "express"
import { deleteChat, getChats, getMessages, sendMessage } from "../controllers/chat.controller.js"
import {authUser} from "../middlewares/auth.middleware.js"

const chatRouter = Router()

/**
 * @route POST /api/chats/message
 * @desc takes input message from user and sends to the Ai as a input
 * @body {message, chat(optional if doing follow-ups)}
 * @return {success, message, title, chat, userMessage, aiMessage}
 */
chatRouter.post("/message", authUser, sendMessage)

/**
 * @route GET /api/chats/
 * @desc retrieves all the chats of the user
 * @return {success, message, chats}
 */
chatRouter.get("/", authUser, getChats)

/**
 * @route GET /api/chats/:chatId/messages
 * @desc retrieves all the messages of the user
 * @params chatId
 * @return {success, message, messages}
 */
chatRouter.get("/:chatId/messages", authUser, getMessages)

/**
 * @route DELETE /api/chats/delete/:chatId
 * @desc deletes a chat
 * @params chatId
 * @return {success, message}
 */
chatRouter.delete("/delete/:chatId", authUser, deleteChat)



export default chatRouter