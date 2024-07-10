import { Request, Response } from "express";
import { Role } from "../database/models/role";

export const getRoles = async (req: Request, res: Response) => {
    try {
        //1. Get information needed
        const services = await Role.find()

        //2. Respond to user
        res.status(200).json(
            {
                success: true,
                message: "All roles retrived successfully!",
                data: services
            }
        )

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Roles can't be retrieved",
            error: error
        })
    }
}

export const createRole = async (req: Request, res: Response) => {
    try {//1. Get needed info
        const name = req.body.name;

        //2. Save it in database
        const newRole = await Role.create(
            {
                name: name
            }
        ).save()

        res.status(200).json(
            {
                success: true,
                message: "Role was created successfully!",
                data: newRole
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Cannot create new role",
                error: error
            })
    }
}

export const updateRole = async (req: Request, res: Response) => {
    try {
        //1. Get information needed
        const roleID = req.params.id
        const body = req.body

        //2. Update the info with the info from the body
        const updatedRole = await Role.update(
            {
                id: parseInt(roleID)
            },
            body
        )

        //2. Respond to user
        res.status(200).json(
            {
                success: true,
                message: "Role was updated successfully!",
                data: updateRole
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                succes: false,
                message: "Cannot update role!",
                error: error
            }
        )
    }
}

export const deleteRole = async (req: Request, res: Response) => {
    try {
        //1. Get the wanted role ID
    const roleID = req.params.id

    //2. Find the role
    const role = await Role.findOne(
        {
            where: {
                id: parseInt(roleID)
            }
        }
    )

    //3. DElete it from db

    const deletedRole = await Role.delete(
        {
            id: parseInt(roleID)
        }
    )

    //4. Response

    res.status(200).json(
        {
            success: true,
            message: "Role was deleted successfully!",
            data: deleteRole
        }
    )
        
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Cannot delete role!",
                error: error
            }
        )
        
    }

}