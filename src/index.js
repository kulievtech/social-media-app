import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.arguments(express.json());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});
