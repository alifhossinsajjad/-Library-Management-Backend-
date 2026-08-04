"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = require("./routes/book.route");
const borrow_route_1 = require("./routes/borrow.route");
const user_route_1 = require("./routes/user.route");
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const notFound_1 = require("./middlewares/notFound");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", book_route_1.BookRoutes);
app.use("/api/borrow", borrow_route_1.BorrowRoutes);
app.use("/api/users", user_route_1.UserRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to Library management system");
});
app.use(notFound_1.notFound);
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
