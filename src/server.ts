import mongoose from "mongoose";
import { Server } from "node:http";
import dotenv from "dotenv";
import app from "./app";
dotenv.config()

let server: Server;
const PORT = process.env.PORT;

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Connected to Database successfully");
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
    
  } catch (error) {
    console.log("Failed to connect to database", error);
  }
}

main();