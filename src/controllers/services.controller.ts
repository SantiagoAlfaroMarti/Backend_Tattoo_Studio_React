import { Request, Response } from "express";
import { Service } from "../database/models/service";

export const createService = async (req: Request, res: Response) => {
    try {

        // 1. Obtener información //
        const service_name = req.body.service_name;
        const description = req.body.description;

        // 2. Validar información //
        if(!service_name || !description){
            return res.status(400).json(
                {
                    success: false,
                    message: "Name and description not be empty"
                }
            )
        }

        // 3. Guardar en la DB //
        const newService = await Service.create(
            {   
                service_name: service_name,
                description: description
            }
        ).save();

        // 4. Respuesta //
        res.status(201).json(
            {
                success: true,
                message: "Service created",
                data: newService
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Service not be created",
                error: error
            }
        )
    }
} 

export const getAllServices = async (req: Request, res: Response) => {
    try {
        // 1. Obtener información //
        const services = await Service.find()

        // 2. Respuesta //
        res.status(200).json(
            {
                success: true,
                message: "Services retrived",
                data: services
            }
        )
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Services not be retrieved",
            error: error
        })
    }
}

export const updateSerivce = async (req: Request, res: Response) => {
        try {
            const serviceId = req.body.id
    
            const service = await Service.findOneBy({
                id: parseInt(serviceId)
            })
    
            if (!service) {
                return res.status(404).json({
                    success: false,
                    message: "Service not found"
                })
            }
    
            const updatedservice = await Service.update({
                id: parseInt(serviceId)
                },
                req.body
            )
    
            return res.status(200).json({
                success: true,
                message: "Service updated",
                data: updatedservice
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Service not be updated",
                error: error
            })
        }
    }

export const deleteService = async (req: Request, res: Response) => {
    try {
        const serviceId = req.body.id

        const service = await Service.findOneBy({
            id: parseInt(serviceId)
        })

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            })
        }

        const updatedservice = await Service.delete({
            id: parseInt(serviceId)
            }
        )

        return res.status(200).json({
            success: true,
            message: "Service deleted",
            data: updatedservice
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Service not be deleted",
            error: error
        })
    }
}