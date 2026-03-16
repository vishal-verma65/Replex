import jwt from "jsonwebtoken"

import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ email }, { username }]
        })

        if (isUserAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "User with username or email exists.",
            })
        }

        const user = await userModel.create({
            username, email, password
        })

        await sendEmail({
            to: email,
            subject: "Welcome to Perplexity!",
            html: `
                <p>Hi <strong>${username}</strong>,</p>
                <p>
                    Thank you for registering at <strong>Perplexity</strong>. 
                    We're <em>excited</em> to have you on board!
                </p>
                <p>
                    Best regards,<br/>
                    <strong>The Perplexity Team</strong>
                </p>
            `,
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        })
    }
}