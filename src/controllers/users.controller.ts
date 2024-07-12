import { Request, Response } from "express";
import { User } from "../database/models/user";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // 1. Obtener información //
        const users = await User.find(
            {
                select: {
                    email: true,
                    created_at: true
                }
            }
        )

        // 2. Respuesta //
        res.json(
            {
                success: true,
                message: "All users retrived",
                data: users
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error to see users",
                error: error
            }
        )
    }
}

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        // 1. Obtener información //
        const userId = req.tokenData.id;

        // 2. Buscar Id en la DB //

        const user = await User.findOne(
            {
                select: {
                    email: true,
                    created_at: true,
                },
                where: {
                    id: userId
                }
            }
        )

        // 3. Respuesta //
        res.json(
            {
                success: true,
                message: "Welcome",
                data: user
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error"
            }
        )
    }
}

export const modifyUserProfile = async (req: Request, res: Response) => {
    try {
        // 1. Obtener información //
        const userId = req.tokenData.id;
        const body = req.body;

        // 2. Validar información //
        const user = User.findOne(
            {
                where: {
                    id: userId
                }
            }
        )

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }

        // 3. Nueva información guardada en la DB //
        const updateBody = await User.update(
            {
                id: userId
            },
            body
        )

        // 4. Confirmación //

        return res.status(200).json({
            success: true,
            message: "User updated",
            data: updateBody
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User not be updated",
            error: error
        })
    }
}
