import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { TokenDecoded } from "../types";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.headers.authorization) {                   //check if token is passed 
            return res.status(400).json(
                {
                    success: false,
                    message: "Unauthorized access!"
                }
            )
        }

        const token = req.headers.authorization.split(' ')[1];         //split token to read it
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenDecoded;          //check if token is with the correct secret word

        req.tokenData = {                          //save the data of the token
            id: decoded.id,
            role_id: decoded.role_id,
            email: decoded.email
        }
        
        next();
        
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error authenticating user",
                error: error
            }
        )
    }
}