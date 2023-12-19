import express from "express";
import dotenv from "dotenv";
import { GlobalError } from "./middlewares/global-error.middleware.js";

import { userRouter } from "./routes/user.routes.js";
import { postRouter } from "./routes/post.routes.js";
import { friendshipRouter } from "./routes/friendship.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/friendship", friendshipRouter);
app.use(GlobalError.handle);

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});
