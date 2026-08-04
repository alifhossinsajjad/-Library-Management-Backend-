import { Schema, model, Document, Model } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

interface IBookModel extends Model<IBook> {
  isBookAvailable(bookId: string): Promise<boolean>;
}

const bookSchema = new Schema<IBook, IBookModel>(
  {
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
  },
  {
    timestamps: true,
  }
);

// Middleware to automatically set available to false if copies becomes 0
bookSchema.pre("save", function () {
  if (this.copies === 0) {
    this.available = false;
  } else if (this.copies > 0) {
    this.available = true;
  }
});

// Post findOneAndUpdate to handle updates (e.g. from service update)
bookSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate() as any;
  if (update && update.copies !== undefined) {
    if (update.copies === 0) {
      update.available = false;
    } else if (update.copies > 0) {
      update.available = true;
    }
  }
});

// Static method
bookSchema.statics.isBookAvailable = async function (bookId: string): Promise<boolean> {
  const book = await this.findById(bookId);
  return !!(book && book.available && book.copies > 0);
};

export const Book = model<IBook, IBookModel>("Book", bookSchema);
