import { postService } from "../services/post.service.js";
import { catchAsync } from "../errors/catchAsync.js";
import { CustomError } from "../errors/customError.js";

class PostController {
    create = catchAsync(async (req, res) => {
        const { body, userId } = req;

        const input = {
            content: body.content,
            comments: body.comments
        };

        if (!input.content) throw new CustomError("Content is required", 400);

        const post = await postService.create(input, userId);

        res.status(200).json({
            data: post
        });
    });

    getAll = catchAsync(async (req, res) => {
        const { userId } = req;

        const posts = await postService.getAll(userId);

        res.status(200).json({
            data: posts
        });
    });

    getOne = catchAsync(async (req, res) => {
        const { userId, params } = req;

        const post = await postService.getOne(params.id, userId);

        res.status(200).json({
            data: post
        });
    });

    update = catchAsync(async (req, res) => {
        const { body, params, userId } = req;

        const update = {};

        if (body.content) {
            update.content = body.content;
        }

        if (body.comments) {
            update.comments = body.comments;
        }

        if (!update.content) throw new CustomError("Content is required", 400);

        await postService.update(params.id, userId, update);

        res.status(204).send();
    });

    deleteOne = catchAsync(async (req, res) => {
        const { params, userId } = req;

        await postService.deleteOne(params.id, userId);

        res.status(204).send();
    });
}

export const postController = new PostController();
