import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true,
        trim: true,
        unique: true,
    },
    email: { 
        type: String, 
        required: true,
        unique: true, 
        trim: true,
        lowercase: true,
    },
    password: { 
        type: String, 
        required: true,
        minLength: 6, 
        select: false
    },
    verified: { 
        type: Boolean, 
        default: false 
    },

}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return ;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    next(error);
  }
});

// Compare password helper
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const userModel = model("User", userSchema);
export default userModel
