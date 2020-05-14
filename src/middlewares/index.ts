import { Request, Response, NextFunction } from 'express';
export const textContentTypeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader('Content-Type', 'text/plain');
  next();
};
