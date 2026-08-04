import { Book, IBook } from "../models/book.model";

export const createBook = async (bookData: Partial<IBook>) => {
  const newBook = await Book.create(bookData);
  return newBook;
};

export const getAllBooks = async (query: Record<string, unknown>) => {
  const { filter, sortBy, sort, limit = 10 } = query;

  // Build filter query
  const filterQuery: Record<string, unknown> = {};
  if (filter) {
    filterQuery.genre = filter;
  }

  // Build sort query
  const sortQuery: Record<string, 1 | -1> = {};
  if (sortBy && typeof sortBy === "string") {
    sortQuery[sortBy] = sort === "desc" ? -1 : 1;
  }

  const limitNumber = Number(limit);

  const books = await Book.find(filterQuery)
    .sort(sortQuery)
    .limit(limitNumber);

  return books;
};

export const getBookById = async (bookId: string) => {
  const book = await Book.findById(bookId);
  return book;
};

export const updateBook = async (bookId: string, updateData: Partial<IBook>) => {
  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    updateData,
    { new: true, runValidators: true }
  );
  return updatedBook;
};

export const deleteBook = async (bookId: string) => {
  const deletedBook = await Book.findByIdAndDelete(bookId);
  return deletedBook;
};
