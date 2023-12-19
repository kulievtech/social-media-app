import { catchAsync } from "../errors/catchAsync.js";
import { CustomError } from "../errors/customError.js";
import { friendshipService } from "../services/friendship.service.js";

class FriendshipController {
    sendRequest = catchAsync(async (req, res) => {
        const {
            userId,
            body: { receiverId }
        } = req;

        if (!receiverId)
            throw new CustomError(
                "Please provide who you want to send the friend request to.",
                400
            );

        if (userId === receiverId)
            throw new CustomError(
                "You cannot send friend request to yourself",
                400
            );

        await friendshipService.sendRequest(userId, receiverId);

        res.status(201).json({
            message: "Friend request sent successfully"
        });
    });

    acceptRequest = catchAsync(async (req, res) => {
        const {
            userId,
            params: { id }
        } = req;

        await friendshipService.acceptRequest(userId, id);

        res.status(200).json({
            message: "Friend request accepted successfully."
        });
    });

    unfriend = catchAsync(async (req, res) => {
        const {
            userId,
            params: { id }
        } = req;

        await friendshipService.unfriend(userId, id);

        res.status(200).json({
            message: "Unfriended successfully."
        });
    });

    cancelRequest = catchAsync(async (req, res) => {
        const {
            userId,
            params: { id }
        } = req;

        await friendshipService.cancelRequest(userId, id);

        res.status(200).json({
            message: "The friend request was successfully canceled."
        });
    });

    rejectRequest = catchAsync(async (req, res) => {
        const {
            userId,
            params: { id }
        } = req;

        await friendshipService.rejectRequest(userId, id);

        res.status(200).json({
            message: "The friend request was successfully rejected."
        });
    });

    getAllFriends = catchAsync(async (req, res) => {
        const { userId } = req;

        const friends = await friendshipService.getAllFriends(userId);

        res.status(200).json({
            message: friends
        });
    });

    getOneFriend = catchAsync(async (req, res) => {
        const {
            params: { id }
        } = req;

        const friend = await friendshipService.getOneFriend(id);

        res.status(200).json({
            message: friend
        });
    });
}

export const friendshipController = new FriendshipController();
