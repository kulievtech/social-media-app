import { prisma } from "../prisma/index.js";
import { CustomError } from "../errors/customError.js";

class FriendshipService {
    sendRequest = async (userId, receiverId) => {
        const receiver = await prisma.user.findUnique({
            where: {
                id: receiverId
            }
        });

        if (!receiver)
            throw new CustomError(
                "The person you are trying to send friend request does not exist."
            );

        await prisma.friendship.create({
            data: {
                senderId: userId,
                receiverId: receiver.id
            }
        });
    };

    acceptRequest = async (userId, id) => {
        const friendship = await prisma.friendship.findUnique({
            where: {
                id: id
            }
        });

        if (!friendship)
            throw new CustomError(
                "The friend request does not exist anymore",
                400
            );

        if (friendship.senderId === userId)
            throw new CustomError(
                "You cannot accept your own friend request.",
                400
            );

        if (friendship.receiverId !== userId)
            throw new CustomError(
                "You are not authorized to perform this action.",
                400
            );

        await prisma.friendship.update({
            where: {
                id: id
            },
            data: {
                status: "ACCEPTED"
            }
        });
    };

    unfriend = async (userId, id) => {
        const friendship = await prisma.friendship.findUnique({
            where: {
                id: id
            }
        });

        if (!friendship)
            throw new CustomError(
                "This user is already not your friend anymore",
                400
            );

        if (friendship.senderId !== userId && friendship.receiverId !== userId)
            throw new CustomError(
                "You are not authorized to perform this action.",
                400
            );

        if (friendship.status === "PENDING")
            throw new CustomError(
                "The request is still pending, you cannot perform this action.",
                400
            );

        await prisma.friendship.delete({
            where: {
                id: id
            }
        });
    };

    cancelRequest = async (userId, id) => {
        const friendship = await prisma.friendship.findUnique({
            where: {
                id: id
            }
        });

        if (!friendship)
            throw new CustomError("Friendship does not exist", 400);

        if (friendship.senderId !== userId)
            throw new CustomError(
                "You are not authorized to perform this action.",
                400
            );

        if (friendship.status === "ACTIVE")
            throw new CustomError(
                "The request was already accepted, you cannot perform this action.",
                400
            );

        await prisma.friendship.delete({
            where: {
                id: id
            }
        });
    };

    rejectRequest = async (userId, id) => {
        const friendship = await prisma.friendship.findUnique({
            where: {
                id: id
            }
        });

        if (!friendship)
            throw new CustomError("Friendship does not exist", 400);

        if (friendship.receiverId !== userId)
            throw new CustomError(
                "You are not authorized to perform this action.",
                400
            );

        if (friendship.status === "ACTIVE")
            throw new CustomError(
                "The request was already accepted, you cannot perform this action.",
                400
            );

        await prisma.friendship.update({
            where: {
                id: id
            },
            data: {
                status: "REJECTED"
            }
        });
    };

    getAllFriends = async (userId) => {
        const friends = await prisma.friendship.findMany({
            where: {
                status: "ACCEPTED",
                senderId: userId
            }
        });

        const friends2 = await prisma.friendship.findMany({
            where: {
                status: "ACCEPTED",
                receiverId: userId
            }
        });

        const allFriends = [...friends, ...friends2];

        return allFriends;
    };

    getOneFriend = async (id) => {
        const friend = await prisma.friendship.findUnique({
            where: {
                id: id
            }
        });

        if (!friend) throw new CustomError("Friend does not exist.", 400);

        return friend;
    };
}

export const friendshipService = new FriendshipService();
