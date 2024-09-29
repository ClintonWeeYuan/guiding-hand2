import { NextFunction, Request, Response } from "express";

import { verifyToken } from "../utilities/security";

export const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid" });
  }

  try {
    res.locals["jwtDecoded"] = await verifyToken(token);
    return next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Token is invalid or expired" });
  }
};
