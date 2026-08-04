"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book ID is required"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be a positive integer"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer",
        },
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date is required"],
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
