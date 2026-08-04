import { Borrow, IBorrow } from "../models/borrow.model";
import { Book } from "../models/book.model";
import { User } from "../models/user.model";
import mongoose from "mongoose";

export const borrowBook = async (borrowData: { book: string; user: string; quantity: number; dueDate: string }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { book: bookId, user: userId, quantity, dueDate } = borrowData;

    // 1. Check if the book exists and is available
    const book = await Book.findById(bookId).session(session);
    if (!book) {
      throw new Error("Book not found");
    }

    if (!book.available || book.copies < quantity) {
      throw new Error("Not enough available copies to borrow");
    }

    // 1.5 Check if the user exists
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error("User not found");
    }

    // 2. Deduct the requested quantity
    book.copies -= quantity;
    // The pre-save middleware on Book will automatically handle setting `available = false` if copies reaches 0
    await book.save({ session });

    // 3. Save the borrow record
    const borrowRecord = await Borrow.create([{
      book: bookId,
      user: userId,
      quantity,
      dueDate: new Date(dueDate),
    }], { session });

    await session.commitTransaction();
    session.endSession();

    return borrowRecord[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const getBorrowedBooksSummary = async () => {
  const summary = await Borrow.aggregate([
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
};
