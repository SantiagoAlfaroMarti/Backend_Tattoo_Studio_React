import { Request, Response } from "express";
import { User } from "../database/models/user";
import bcrypt from 'bcrypt';

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
        const { email,first_name,last_name,password } = req.body;
        let passwordHashed;
        if (password) {
                if (password.length < 8 || password.length > 12) {
                return res.status(400).json({
                    success: false,
                    message: "The entered password does not respond to the requirements!"
                });
            }
            passwordHashed = bcrypt.hashSync(password, 12);
        }

        // 2. Validar información //
        const user = await User.findOne(
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
            });
        }

        // 3. Nueva información guardada en la DB //
        const updateFields:any={
            email:email,
            first_name:first_name,
            last_name:last_name,
            password:passwordHashed
        };
        await User.update(
            {
                id:userId
            },
            updateFields
        );

        // 4. Confirmación //

        return res.status(200).json({
            success: true,
            message: "User information was updated successfully",
            data: updateFields
        });

    } catch (error){
        res.status(500).json({
            success: false,
            message: "User not be updated",
            error: error
        });
    }
}
export const getProfileByUserId = async (req: Request, res: Response) => {
    try {
        // 1. Obtener información //
        const userId = req.params.id;

        // 2. Validar información //
        const user = await User.findOne(
            {
                where: {
                    id: parseInt(userId)
                }
            }
        )

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        // 4. Confirmación //

        return res.status(200).json({
            success: true,
            message: "User updated",
            data: user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User not be updated",
            error: error
        })
    }
}
export const deleteUserById = async (req: Request, res: Response) => {
    try {
      // 1. Recuperar el id del usuario a traves de req.params
      const userId = +req.params.id;
  
      // 2. Eliminar el usuario
      const user = await User.delete({
        id: userId,
      });
  
      res.status(204).json({
        success: true,
        message: "User successfully deleted",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting user",
        error: error,
      });
    }
  };