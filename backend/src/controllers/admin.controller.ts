import { Request, Response } from 'express';

export const getAdminProfile = (req: Request, res: Response) => {
    res.send('admin route');
};
