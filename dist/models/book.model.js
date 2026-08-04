"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    author: {
        type: String,
        required: [true, "Author is required"],
    },
    genre: {
        type: String,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: "{VALUE} is not a valid genre",
        },
        required: [true, "Genre is required"],
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required"],
        unique: true,
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: [true, "Copies are required"],
        min: [0, "Copies cannot be less than 0"],
        validate: {
            validator: Number.isInteger,
            message: "Copies must be an integer",
        },
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Middleware to automatically set available to false if copies becomes 0
bookSchema.pre("save", function () {
    if (this.copies === 0) {
        this.available = false;
    }
    else if (this.copies > 0) {
        this.available = true;
    }
});
// Post findOneAndUpdate to handle updates (e.g. from service update)
bookSchema.pre("findOneAndUpdate", function () {
    const update = this.getUpdate();
    if (update && update.copies !== undefined) {
        if (update.copies === 0) {
            update.available = false;
        }
        else if (update.copies > 0) {
            update.available = true;
        }
    }
});
// Static method
bookSchema.statics.isBookAvailable = function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        return !!(book && book.available && book.copies > 0);
    });
};
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
