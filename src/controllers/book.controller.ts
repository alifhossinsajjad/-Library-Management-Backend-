import { Request, Response, NextFunction } from "express";
import * as BookService from "../services/book.service";

export const createBook = async (req: Request, res: Response) => {
  const book = await BookService.createBook(req.body);
  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
};

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await BookService.getAllBooks(req.query);
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const book = await BookService.getBookById(bookId as string);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: "No book exists with this ID",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const book = await BookService.updateBook(bookId as string, req.body);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: "No book exists with this ID",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const book = await BookService.deleteBook(bookId as string);

    if (!book) {
       res.status(404).json({
        success: false,
        message: "Book not found",
        error: "No book exists with this ID",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null, // Note requirement says `data: null` for delete
    });
  } catch (error) {
    next(error);
  }
};
