import { Router } from "express";
import * as BorrowController from "../controllers/borrow.controller";

const router = Router();

router.post("/", BorrowController.borrowBook);
router.get("/", BorrowController.getBorrowedBooksSummary);

export const BorrowRoutes = router;
