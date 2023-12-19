import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { friendshipController } from "../controllers/friendship.controller.js";

const friendshipRouter = Router();

friendshipRouter.post(
    "/send-request",
    authMiddleware.authenticate,
    friendshipController.sendRequest
);
friendshipRouter.post(
    "/accept-request/:id",
    authMiddleware.authenticate,
    friendshipController.acceptRequest
);
friendshipRouter.delete(
    "/unfriend/:id",
    authMiddleware.authenticate,
    friendshipController.unfriend
);
friendshipRouter.delete(
    "/cancel-request/:id",
    authMiddleware.authenticate,
    friendshipController.cancelRequest
);
friendshipRouter.post(
    "/reject-request/:id",
    authMiddleware.authenticate,
    friendshipController.rejectRequest
);
friendshipRouter.get(
    "/",
    authMiddleware.authenticate,
    friendshipController.getAllFriends
);
friendshipRouter.get(
    "/:id",
    authMiddleware.authenticate,
    friendshipController.getOneFriend
);

export { friendshipRouter };
