import express, { Application, Request, Response } from "express";
import { BookRoutes } from "./routes/book.route";
import { BorrowRoutes } from "./routes/borrow.route";
import { UserRoutes } from "./routes/user.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";

const app: Application = express();

app.use(express.json());

app.use("/api/books", BookRoutes);
app.use("/api/borrow", BorrowRoutes);
app.use("/api/users", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library management system");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
