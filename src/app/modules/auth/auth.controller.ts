import httpStatus from "http-status";
import catchAsync from "../../utils/catch.async";
import AppError from "../../errors/AppError";
import { sendResponse } from "../../utils/send.response";
import { AuthUtils } from "./auth.utils";
import { Constatnt } from "../../constants/constants";
import config from "../../config";
import { isEmail, millisecondsConvert } from "../../utils/utils";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const { emailOrUserName } = req.body;

  const body = {
    ...(isEmail(emailOrUserName)
      ? {
          email: emailOrUserName,
        }
      : {
          userName: emailOrUserName,
        }),
    password: req.body?.password,
  };

  const { accessToken, user } = await AuthServices.loginUser(body);

  if (!accessToken)
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong",
    );

  res.cookie(Constatnt.TOKENS.ACCESS_TOKEN, accessToken, {
    secure: !(config.PROJECT_ENVIRONMENT === "development"), // if development environment then false else true
    httpOnly: true,
    sameSite: "none",
    maxAge:
      Number(millisecondsConvert(config.JWT_ACCESS_EXPIRES_IN)) ||
      1000 * 60 * 60 * 24,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "you logged in succesfully!",
    data: user,
  });
});

const logoutUser = catchAsync(async (req, res) => {
  AuthUtils.clearAllCookies(req, res);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logout succesfully",
    data: null,
  });
});

// const emailVerifyRequest = catchAsync(async (req, res) => {
//   const { userId } = req as IRequestWithActiveDetails;

//   const result = await AuthServices.emailVerifyRequest(userId);

//   return sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "send verification mail succesfully",
//     data: result,
//   });
// });

// const verifyEmail = catchAsync(async (req, res) => {
//   const { verifyEmailTokenData } = req as IRequestWithActiveDetails;

//   const result = await AuthServices.verifyEmail(
//     verifyEmailTokenData as IVerifyEmailTokenData,
//   );

//   return sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "email verified succesfully",
//     data: result,
//   });
// });

// const forgotPassword = catchAsync(async (req, res) => {
//   const { emailOrUserName } = req.body;

//   const result = await AuthServices.forgetPassword(emailOrUserName);

//   return sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "email sent successfully",
//     data: result,
//   });
// });

// const resetPassword = catchAsync(async (req, res) => {
//   const { password } = req.body;

//   const { forgetPasswordTokenData } = req as IRequestWithActiveDetails;

//   if (!forgetPasswordTokenData)
//     throw new AppError(httpStatus.BAD_REQUEST, "Token data is not valid");

//   const { userId } = forgetPasswordTokenData;

//   const result = await AuthServices.resetPassword(userId, password);

//   return sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "email send successfully",
//     data: result,
//   });
// });

export const AuthController = {
  loginUser,
  logoutUser,
};
