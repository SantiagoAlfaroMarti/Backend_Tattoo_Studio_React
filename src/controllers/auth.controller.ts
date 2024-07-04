import { Request, Response, request } from "express";
import { User } from "../database/models/user";
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
    try {

        // 1. Recuperar la información

        const email = req.body.email;
        const password_hash = req.body.password_hash;
        const role = req.body.role_id


        // 2. Validar la información

        if (!email || !password_hash) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email and password cannot be empty!"
                }
            )
        }

        if(password_hash.length < 8  || password_hash.length > 12) {
            return res.status(400).json(
                {
                    success: false,
                    message: "The provided password does not respond to the requirements!"
                }
            )
        }
        

        // TODO validar formato email 

        if(password.length < 8  || password.length > 12) {
            return res.status(400).json(
              {
                success: false,
                message: "Password is not valid, 8 to 12 charachters must be needed"
              }
            )
          }


        // 3. Tratar la info si hace falta
        const passwordCrypted = bcrypt.hashSync(password_hash, 10)


        // 4. Guardar en la base de datos

        const newUser = await User.create(
            {
                email: email,
                password_hash: passwordCrypted
            }
        ).save();

        //5. Responder

        res.status(201).json(
            {
                success: true,
                message: "User was created successfully! You can now log in to the page!",
                data: newUser
            }
        )
    }

    catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Cannot create user",
                error: error
            }
        )
    }
}

export const userLogIn = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Cannot create user",
                error: error
            }
        )
    }
}