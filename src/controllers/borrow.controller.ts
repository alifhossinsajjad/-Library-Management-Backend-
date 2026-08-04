import { Request, Response, NextFunction } from "express";
import * as BorrowService from "../services/borrow.service";

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const borrowRecord = await BorrowService.borrowBook(req.body);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error) {
    next(error);
  }
};

export const getBorrowedBooksSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await BorrowService.getBorrowedBooksSummary();
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};
