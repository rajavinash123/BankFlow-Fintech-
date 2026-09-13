const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const emailService = require("../services/email.service");


// ======================================================
// REGISTER CONTROLLER
// ======================================================

async function userRegisterController(req, res) {

    try {

        // Get data from request body
        const { name, email, password } = req.body;


        // 1. Check required fields
        if (!name || !email || !password) {

            return res.status(400).json({
                message: "All inputs are required"
            });
        }


        // 2. Check if user already exists
        const userAlreadyExist = await userModel.findOne({
            email
        });

        if (userAlreadyExist) {

            return res.status(400).json({
                message: "Email already exists"
            });
        }


        // 3. Hash password
        const hashPassword = await bcrypt.hash(
            password,
            10
        );


        // 4. Create user
        const user = await userModel.create({
            name,
            email,
            password: hashPassword
        });


        // 5. Create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );


        // 6. Store JWT in cookie
        res.cookie("token", token);


        // 7. Send registration email
        await emailService.sendRegisterEmail(
            user.email,
            user.name
        );


        // 8. Send response
        return res.status(201).json({

            message: "User registered successfully",

            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },

            token
        });

    } catch (error) {

        console.error("Register error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}



// ======================================================
// LOGIN CONTROLLER
// ======================================================

async function userLoginController(req, res) {

    try {

        // Get data from request body
        const { email, password } = req.body;


        // 1. Check required fields
        if (!email || !password) {

            return res.status(400).json({
                message: "Email and password are required"
            });
        }


        // 2. Find user
        const user = await userModel
            .findOne({ email })
            .select("+password");


        // 3. If user doesn't exist
        if (!user) {

            return res.status(400).json({
                message: "Email or password is invalid"
            });
        }


        // 4. Compare password
        const isValidPassword =
            await user.comparePassword(password);


        // 5. If password is wrong
        if (!isValidPassword) {

            return res.status(400).json({
                message: "Email or password is invalid"
            });
        }


        // 6. Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );


        // 7. Store JWT in cookie
        res.cookie("token", token);


        // 8. Send response
        return res.status(200).json({

            message: "Login successful",

            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });

    } catch (error) {

        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}



// ======================================================
// EXPORT CONTROLLERS
// ======================================================

module.exports = {
    userRegisterController,
    userLoginController
};