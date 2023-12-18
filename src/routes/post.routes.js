import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { postController } from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.post("/", authMiddleware.authenticate, postController.create);
postRouter.get("/", authMiddleware.authenticate, postController.getAll);
postRouter.get("/:id", authMiddleware.authenticate, postController.getOne);
postRouter.patch("/:id", authMiddleware.authenticate, postController.update);
postRouter.delete(
    "/:id",
    authMiddleware.authenticate,
    postController.deleteOne
);

export { postRouter };
