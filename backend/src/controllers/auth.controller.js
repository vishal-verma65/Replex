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

        const emailVerificationToken = jwt.sign({
            email: user.email,
            id: user._id
        }, process.env.JWT_VERIFY_SECRET)

        await sendEmail({
            to: email,
            subject: "Welcome to Replex!",
            html: `
                <p>Hi <strong>${username}</strong>,</p>
                <p>
                    Thank you for registering at <strong>Perplexity</strong>. 
                    We're <em>excited</em> to have you on board!
                </p>

                <p>Please verify email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}" >Verify email</a>

                <p>If you did not create an account, please ignore this email.</p>
                <p>
                    Best regards,<br/>
                    <strong>The Replex Team</strong>
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

export const login = async(req, res)=>{
    const {email, password} = req.body

    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Invalid email or password.",
            err: "User not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch){
        return res.status(400).json({
            success:false,
            message:"Invalid email or password.",
            err: "Incorrect password"
        })
    }

    if(!user.verified){
        return res.status(400).json({
            success:false,
            message:"Please verify your email before logging in.",
            err: "Email not verified."
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET, {expiresIn: "7d"})

    res.cookie("token", token)

    res.status(200).json({
        success:true,
        message:"User logged in successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

export const verifyEmail = async(req, res)=>{
    const {token} = req.query

    try{
        const decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET)
        const user = await userModel.findOne({
            $and: [
                {email: decoded.email},
                {_id: decoded.id}
            ]
        })
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid token",
                err: "User not found"
            })
        }

        user.verified = true;

        await user.save();

        const html = `
            <h1>Email Verified Successfully.</h1>    
            <p>Your email has been verified. You can now log in to your account.</p>
            <a href="http://localhost:3000/api/auth/login" >Go to Login</a>
        `
        res.send(html)
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Invalid or expired token.",
            err: err.message
        })
    }
}

export const getMe = async(req, res)=>{
    const userId = req.user.id
    const user = await userModel.findById(userId)

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found.",
            err: "User not found"
        })
    }

    res.status(200).json({
        success:true,
        message:"User details fetched successfully.",
        user
    })

}