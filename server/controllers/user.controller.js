import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message:"All fields are required"
            })
        }
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                success: false,
                message:"User with this email already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password:hashedPassword
        })
        
        return res.status(200).json({
            success:true,
            message:`Account with ${email} created successfully`
        })
    } catch (error) {
        console.log("registering error",error);
        return res.status(500).json({
            success: false,
            message:"Error in registering user"
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: "All fields are required",
          });
        }
        const user = await User.findOne({email});
         if (!user) {
           return res.status(400).json({
             success: false,
             message: "user with this email doesn't exists",
           });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          return res.status(400).json({
            success: false,
            message: "Password doesn't matched",
          });
        }

        generateToken(res, user, `Welcome back ${user.name}`);


    } catch (error) {
        console.log("login error",error);
        return res.status(500).json({
            success: false,
            message:"Failed to login"
        })
    }
}