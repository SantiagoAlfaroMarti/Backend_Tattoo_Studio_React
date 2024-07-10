import { Request, Response, request } from "express";
import { User } from "../database/models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    try {
        //1. Retrive all the information of the request
        const email = req.body.email;
        const password_hash = req.body.password_hash;

        // const body = { email, password_hash }

        //2. Validate the obtained information

        if (!email || !password_hash) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email and password cannot be empty!"
                }
            )
        }

        if (password_hash.length < 8 || password_hash.length > 12) {
            return res.status(400).json(
                {
                    success: false,
                    message: "The provided password does not respond to the requirements!"
                }
            )
        }


        // TODO email comprobation must be inserted 


        //3. Work with the obtained user information - in our case encrypt the password
        const passwordCrypted = bcrypt.hashSync(password_hash, 10)


        //4. Save the info in out DataBase

        const newUser = await User.create(
            {
                email: email,
                password_hash: passwordCrypted
            }
        ).save();

        //5. Respond to the page

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
        // 1. Get the needed user information
        const { email, password_hash } = req.body

        //2. Make a validation
        if (!email || !password_hash) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email or password cannot be empty"
                }
            )
        }

        //3. Check if the user exists in our DataBase
        const user = await User.findOne({
            where: { email: email }
        })

        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email or password are not valid!"
                }
            )
        }

        //4. If user exists, then we need to check his password

        const validPass = bcrypt.compareSync(password_hash, user.password_hash)

        if (!validPass) {
            return res.status(400).json({
                success: false,
                message: "Email or password are wrong!"
            })
        }

        //5. Token creation

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
                message: "Welcome, user!",
                token: token
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Cannot login user",
                error: error
            }
        )
    }
}