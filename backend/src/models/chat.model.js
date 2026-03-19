import mongoose from "mongoose";

const { Schema, model } = mongoose;

const chatSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    title: { 
        type: String, 
        required: true, 
    },
    // description: { 
    //     type: String, 
    //     enum: ["user", "ai"],
    //     required: true,
    // },
}, { timestamps: true });

const chatModel = model("Chat", chatSchema);
export default chatModel
