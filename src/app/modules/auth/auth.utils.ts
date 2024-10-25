import jwt, { JwtPayload } from "jsonwebtoken";
import { IErrorDetails, IJWTPayload } from "./auth.interface";
import { Request, Response } from "express";
import AppError from "../../errors/AppError";

const createToken = (
  jwtPayload: IJWTPayload,
  secret: string,
  expiresIn?: string,
) => {
  if (expiresIn)
    return jwt.sign(jwtPayload, secret, {
      expiresIn,
    });

  return jwt.sign(jwtPayload, secret);
};

const verifyToken = (
  token: string,
  secret: string,
  errorDetails?: IErrorDetails,
) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    if (!errorDetails) throw error;

    throw new AppError(errorDetails.statusCode, errorDetails.message);
  }
};

const clearAllCookies = (req: Request, res: Response) => {
  return Object.keys(req?.cookies).forEach((cookie) => res.clearCookie(cookie));
};

export const AuthUtils = {
  createToken,
  verifyToken,
  clearAllCookies,
};
