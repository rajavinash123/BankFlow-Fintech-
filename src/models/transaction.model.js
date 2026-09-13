const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        FromAccount: {
            type: mongoose.Types.ObjectId,
            ref: "account",
            required: true,
            index: true
        },

        ToAccount: {
            type: mongoose.Types.ObjectId,
            ref: "account",
            required: true,
            index: true
        },

        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [1, "Amount must be greater than 0"]
        },


        //client side per generate
        // 
        idempotencyKey: {
    type: String,
    required: [true, "Idempotency key is required for creating a transaction"],
    index: true,
    unique: true
},

        status: {
            type: String,
            enum: ["pending", "completed", "failed", "cancelled"],
            default: "pending",
            index: true
        },

        currency: {
            type: String,
            required: [true, "Currency is required"],
            default: "INR"
        }
    },
    {
        timestamps: true
    }
);

const transactionModel = mongoose.model(
    "transaction",
    transactionSchema
);

module.exports = transactionModel;