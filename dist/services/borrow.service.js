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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowedBooksSummary = exports.borrowBook = void 0;
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
const user_model_1 = require("../models/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const borrowBook = (borrowData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { book: bookId, user: userId, quantity, dueDate } = borrowData;
        // 1. Check if the book exists and is available
        const book = yield book_model_1.Book.findById(bookId).session(session);
        if (!book) {
            throw new Error("Book not found");
        }
        if (!book.available || book.copies < quantity) {
            throw new Error("Not enough available copies to borrow");
        }
        // 1.5 Check if the user exists
        const user = yield user_model_1.User.findById(userId).session(session);
        if (!user) {
            throw new Error("User not found");
        }
        // 2. Deduct the requested quantity
        book.copies -= quantity;
        // The pre-save middleware on Book will automatically handle setting `available = false` if copies reaches 0
        yield book.save({ session });
        // 3. Save the borrow record
        const borrowRecord = yield borrow_model_1.Borrow.create([{
                book: bookId,
                user: userId,
                quantity,
                dueDate: new Date(dueDate),
            }], { session });
        yield session.commitTransaction();
        session.endSession();
        return borrowRecord[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.borrowBook = borrowBook;
const getBorrowedBooksSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield borrow_model_1.Borrow.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" },
            },
        },
        {
            $lookup: {
                from: "books", // the collection name is typically the plural lowercase of the model name
                localField: "_id",
                foreignField: "_id",
                as: "bookDetails",
            },
        },
        {
            $unwind: "$bookDetails", // unwind the array created by $lookup
        },
        {
            $project: {
                _id: 0, // exclude the group _id
                "book.title": "$bookDetails.title",
                "book.isbn": "$bookDetails.isbn",
                totalQuantity: 1,
            },
        },
    ]);
    return summary;
});
exports.getBorrowedBooksSummary = getBorrowedBooksSummary;
