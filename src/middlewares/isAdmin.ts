import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.tokenData)
        if(req.tokenData.role_id !== 2) {
         return res.status(400).json(
            {
            success: false,
            message: "Access denied!"
            }
         )
        }
        
        next();
        
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error in checking admin role!"
            }
        )
        
    }
} 