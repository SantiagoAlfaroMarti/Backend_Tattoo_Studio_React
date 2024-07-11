import { Request, Response } from "express";
import { Role } from "../database/models/role";

export const getRoles = async (req: Request, res: Response) => {
    try {
        // 1. Obtener información //
        const services = await Role.find()

        // 2. Respuesta //
        res.status(200).json(
            {
                success: true,
                message: "All roles retrived",
                data: services
            }
        )

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Roles not be retrieved",
            error: error
        })
    }
}

export const createRole = async (req: Request, res: Response) => {
    try {
        
        // 1. Obtener información //
        const name = req.body.name;

        // 2. Guardar en DB //
        const newRole = await Role.create(
            {
                name: name
            }
        ).save()

        res.status(200).json(
            {
                success: true,
                message: "Role was created",
                data: newRole
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Role not created",
                error: error
            })
    }
}

export const updateRole = async (req: Request, res: Response) => {
    try {
        // 1. Obtener información //
        const roleID = req.params.id
        const body = req.body

        // 2. Actualizar información //
        const updatedRole = await Role.update(
            {
                id: parseInt(roleID)
            },
            body
        )

        // 2. Resuesta //
        res.status(200).json(
            {
                success: true,
                message: "Role was updated",
                data: updateRole
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                succes: false,
                message: "Role not updated",
                error: error
            }
        )
    }
}

export const deleteRole = async (req: Request, res: Response) => {
    try {

    // 1. Obtener información //
    const roleID = req.params.id

    // 2. Buscar rol // 
    const role = await Role.findOne(
        {
            where: {
                id: parseInt(roleID)
            }
        }
    )

    // 3. Eliminar rol //

    const deletedRole = await Role.delete(
        {
            id: parseInt(roleID)
        }
    )

    // 4. Respuesta //

    res.status(200).json(
        {
            success: true,
            message: "Role was deleted",
            data: deleteRole
        }
    )
        
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Role not delete",
                error: error
            }
        ) 
    }
}