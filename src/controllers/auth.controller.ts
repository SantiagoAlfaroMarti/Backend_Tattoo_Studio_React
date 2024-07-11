import { Request, Response, request } from "express";
import { User } from "../database/models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    try {
        // 1. Recuperar información //
        const email = req.body.email;
        const password_hash = req.body.password_hash;

        // 2. Validar información //
        if (!email || !password_hash) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email and password not be empty"
                }
            )
        }

        if (password_hash.length < 7 || password_hash.length > 14) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Password is not correct"
                }
            )
        }

        // 3. Encriptar la contraseña //
        const passwordCrypted = bcrypt.hashSync(password_hash, 10)


        // 4. Guardar información en la DB //
        const newUser = await User.create(
            {
                email: email,
                password_hash: passwordCrypted
            }
        ).save();

        // 5. Respuesta // 
        res.status(201).json(
            {
                success: true,
                message: "User was created",
                data: newUser
            }
        )
    }

    catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "User not created",
                error: error
            }
        )
    }
}

export const userLogIn = async (req: Request, res: Response) => {
    try {
        // 1. Obtener información //
        const { email, password_hash } = req.body
        // 2. Validar información //
        if (!email || !password_hash) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email or password not be empty"
                }
            )
        }
        // 3. Comprobar usuario en DB //
        const user = await User.findOne({
            where: { email: email }
        })

        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email or password is not correct"
                }
            )
        }

        // 4. Verificar contraseña usuario //
        const validPass = bcrypt.compareSync(password_hash, user.password_hash)

        if (!validPass) {
            return res.status(400).json({
                success: false,
                message: "Error email or password"
            })
        }

        // 5. Token //
        const token = jwt.sign(
            {
                id: user.id,
                role_id: user.role_id,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "2h"
            }
        )
        

        res.status(200).json(
            {
                success: true,
                message: "Hello",
                token: token
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Cannot access",
                error: error
            }
        )
    }
}