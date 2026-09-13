const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "account",
            index: true,
            required: [true, "Ledger must be associated with account"],
            immutable: true
        },

        transaction: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "transaction",
            required: [
                true,
                "Ledger must be associated with a transaction"
            ],
            index: true,
            immutable: true
        },

        amount: {
            type: Number,
            required: [
                true,
                "Amount is required for creating a ledger entry"
            ],
            min: [0, "Amount cannot be negative"],
            immutable: true
        },

        type: {
            type: String,
            enum: {
                values: ["CREDIT", "DEBIT"],
                message: "Type must be CREDIT or DEBIT"
            },
            required: [true, "Ledger entry type is required"],
            immutable: true
        },

        balanceAfter: {
            type: Number,
            required: [
                true,
                "Balance after transaction is required"
            ],
            min: [0, "Balance cannot be negative"],
            immutable: true
        },

        currency: {
            type: String,
            required: [true, "Currency is required"],
            default: "INR",
            immutable: true
        }
    },
    {
        timestamps: true
    }
);


// ========================================
// PREVENT LEDGER MODIFICATION
// ========================================

function preventLedgerModification() {
    throw new Error(
        "Ledger entries are immutable and cannot be modified"
    );
}


// UPDATE PROTECTION

ledgerSchema.pre(
    "findOneAndUpdate",
    preventLedgerModification
);

ledgerSchema.pre(
    "updateOne",
    preventLedgerModification
);

ledgerSchema.pre(
    "updateMany",
    preventLedgerModification
);


// DELETE PROTECTION

ledgerSchema.pre(
    "findOneAndDelete",
    preventLedgerModification
);

ledgerSchema.pre(
    "deleteOne",
    preventLedgerModification
);

ledgerSchema.pre(
    "deleteMany",
    preventLedgerModification
);


// ========================================
// MODEL
// ========================================

const ledgerModel = mongoose.model(
    "ledger",
    ledgerSchema
);

module.exports = ledgerModel;