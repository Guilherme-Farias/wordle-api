import { Request, Response, NextFunction } from 'express';

export const noCache = (
  _: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate',
  );
  res.set('pragma', 'no-cache');
  res.set('expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
};
