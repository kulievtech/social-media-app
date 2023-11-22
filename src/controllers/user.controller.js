import { userService } from "../services/user.service.js";
import { catchAsync } from "../errors/catchAsync.js";
import { CustomError } from "../errors/customError.js";

class UserController {
    signUp = catchAsync(async (req, res) => {
        const {
            email,
            password,
            firstName,
            lastName,
            dateOfBirth,
            country,
            education,
            workExperience
        } = req.body;

        const userInput = {
            email,
            password,
            firstName,
            lastName,
            dateOfBirth,
            country,
            education,
            workExperience
        };

        await userService.signUp(userInput);

        res.status(201).json({
            message: "User registration successful!"
        });
    });

    activate = catchAsync(async (req, res) => {
        const {
            query: { activationToken }
        } = req;

        if (!activationToken)
            throw new CustomError("Activation Token is missing", 400);

        await userService.activate(activationToken);

        res.status(200).json({
            message: "Success"
        });
    });

    login = catchAsync(async (req, res) => {
        const { body } = req;

        const input = {
            email: body.email,
            password: body.password
        };

        const jwt = await userService.login(input);

        res.status(200).json({
            token: jwt
        });
    });

    forgotPassword = catchAsync(async (req, res) => {
        const { body } = req;

        await userService.forgotPassword(body.email);

        res.status(200).json({
            message: "Password reset email has been sent"
        });
    });

    resetPassword = catchAsync(async (req, res) => {
        const {
            body: { password, passwordConfirm },
            headers
        } = req;

        if (!password || !passwordConfirm)
            throw new CustomError(
                "Password and Password Confirm is required",
                400
            );

        if (password !== passwordConfirm)
            throw new CustomError(
                "Password and Password Confirm does not match",
                400
            );

        if (!headers.authorization)
            throw new CustomError("Reset Token is missing", 400);

        const [bearer, token] = headers.authorization.split(" ");

        if (bearer !== "Bearer" || !token)
            throw new CustomError("Invalid Token", 400);

        await userService.resetPassword(token, password);
        res.status(200).json({
            message: "Password successfully updated!"
        });
    });

    getMe = catchAsync(async (req, res) => {
        const { userId } = req;

        const me = await userService.getMe(userId);

        res.status(200).json({
            data: me
        });
    });

    changePassword = catchAsync(async (req, res) => {
        const { newPassword, newPasswordConfirm } = req.body;

        if (!newPassword || !newPasswordConfirm)
            throw new CustomError(
                "All fields are required: New Password and New Password Confirmation",
                400
            );

        if (newPassword !== newPasswordConfirm)
            throw new CustomError(
                "Password and Password Confirm does not match",
                400
            );

        await userService.changePassword(newPassword, req.userId);

        res.status(200).json({
            message: "Password successfully updated!"
        });
    });
}

export const userController = new UserController();
