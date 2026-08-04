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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield book_model_1.Book.create(bookData);
    return newBook;
});
exports.createBook = createBook;
const getAllBooks = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy, sort, limit = 10 } = query;
    // Build filter query
    const filterQuery = {};
    if (filter) {
        filterQuery.genre = filter;
    }
    // Build sort query
    const sortQuery = {};
    if (sortBy && typeof sortBy === "string") {
        sortQuery[sortBy] = sort === "desc" ? -1 : 1;
    }
    const limitNumber = Number(limit);
    const books = yield book_model_1.Book.find(filterQuery)
        .sort(sortQuery)
        .limit(limitNumber);
    return books;
});
exports.getAllBooks = getAllBooks;
const getBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(bookId);
    return book;
});
exports.getBookById = getBookById;
const updateBook = (bookId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, updateData, { new: true, runValidators: true });
    return updatedBook;
});
exports.updateBook = updateBook;
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBook = yield book_model_1.Book.findByIdAndDelete(bookId);
    return deletedBook;
});
exports.deleteBook = deleteBook;
