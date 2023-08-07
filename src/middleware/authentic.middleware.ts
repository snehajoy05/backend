import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import HttpException from "../exception/http.exception";
import { RequestWithUser } from "../utils/requestwithUser";
import { jwtPayLoad } from "../utils/jwtpayload";

const authenticate = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFromRequestHeader(req);
    if (!token) {
      throw new HttpException(401, "Token not provided");
    }

    const payload: jwtPayLoad = jsonwebtoken.verify(token, "ABCDE") as jwtPayLoad;
    req.name = payload.name;
    req.email = payload.email;
    req.role = payload.role;

    next();
  } catch (error) {
    if (error instanceof jsonwebtoken.TokenExpiredError) {
      next(new HttpException(401, "Token expired"));
    } else {
      next(new HttpException(401, error.message || "Invalid token"));
    }
  }
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
  const bearerToken = req.header("Authorization");
  const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
  return token;
};

export default authenticate;
