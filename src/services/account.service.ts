import { Request, Response } from 'express';

export const user = async (req: Request, res: Response) => {
  res.status(200).send({ name: 'santosh' });
};
