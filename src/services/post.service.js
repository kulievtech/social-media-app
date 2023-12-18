import { prisma } from "../prisma/index.js";
import { CustomError } from "../errors/customError.js";
import { v4 as uuid } from "uuid";

class PostService {
    create = async (input, userId) => {
        const post = await prisma.post.create({
            data: {
                ...input,
                userId: userId
            }
        });
        return post;
    };

    getAll = async (userId) => {
        const posts = await prisma.post.findMany({
            where: {
                userId: userId
            }
        });

        return posts;
    };

    getOne = async (id, userId) => {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        });

        if (!post) throw new CustomError("Post does not exist", 400);

        if (post.userId !== userId)
            throw new CustomError(
                "Forbidden: This project does not belong to you!",
                403
            );

        return post;
    };

    update = async (id, userId, update) => {
        await prisma.post.update({
            where: {
                id: id,
                userId: userId
            },
            data: {
                ...update
            }
        });
    };

    deleteOne = async (id, userId) => {
        await prisma.post.delete({
            where: {
                id: id,
                userId: userId
            }
        });
    };
}

export const postService = new PostService();
