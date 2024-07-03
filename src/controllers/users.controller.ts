import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../database/models/User";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        //1. Retrive all of the users
        const users = await User.find()

        //2. Provide a response
         res.status(200).json(
            {
                success: true,
                message: "Users retrived successfully!",
                data: users
            }
         )

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

export const updateUserById = async (req: Request, res: Response) => {
    try {
        //1. Retrive the id for the user which we want to update
        const userIdToUpdate = req.params.userIdToUpdate
        const body = req.body

        //2. If needed we can - validate the info or amend it

        //4. Update the info in our DataBase
        const userUpdated = await User.update(
            {
                id: parseInt(userIdToUpdate)
            },
            body
        )

        //5. Provide a response to the web page
        res.status(200).json(
            {
                success: true,
                message: "User updated successfully!",
                data: userUpdated
            }
        )
    } catch (error) {
      res.status(500).json(
        {
            success: false,
            message: "User cannot be updated! Try again!",
            error: error
        }
      )
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        //1. Get the id of the user we want to delete

      const userIdToDelete = Number(req.params.id)

      //2. Delete the user from the DataBase
      const userDeleted = await User.delete(userIdToDelete)

      if(!userDeleted.affected) {
        return res.status(400).json(
            {
                success: false,
                message: "The ID of the user does not exist!"
            }
        )
      }

      //3. Provide a response
      res.status(200).json(
        {
            success: true,
            message: "User was deleted successfully!",
            data: userDeleted
        }
      )
    } catch(error){
        res.status(500).json(
            {
                success: false,
                message: "Error deleting user! Please, try again!",
                error: error
            }
        )
    }
}