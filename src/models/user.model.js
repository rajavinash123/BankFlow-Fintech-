const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            unique: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Invalid email",
            ],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Minimum length is 6 characters"],
            select:false
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre("save", async function (next) {

    // Password modify nahi hua
    // to dobara hash mat karo
    if (!this.isModified("password")) {
        return next();
    }

    // Plain password ko hash karo
    const hash = await bcrypt.hash(this.password, 10);

    // Hashed password save karo
    this.password = hash;

    next();
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (password) {

    return await bcrypt.compare(
        password,
        this.password
    );
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;