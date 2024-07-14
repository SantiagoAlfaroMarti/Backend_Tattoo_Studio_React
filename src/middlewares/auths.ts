import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { TokenDecoded } from "../types";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Ver si token es correcto //
        if(!req.headers.authorization) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Unauthorized access!"
                }
            )
        }

        const token = req.headers.authorization.split(' ')[1];
        // Ver si el token es correcto con la palabra secreta //
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenDecoded;
        // Guardar los datos del token //
        req.tokenData = {
            id: decoded.id,
            role_id: decoded.role_id,
            email: decoded.email
        }
        next();     
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "User authentication error",
                error: error
            }
        )
    }
}