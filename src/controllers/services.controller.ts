import { Request, Response } from "express";
import { Service } from "../database/models/service";

export const createService = async (req: Request, res: Response) => {
    try {
        //1. Retrive info from the user
        const service_name = req.body.service_name;
        const description = req.body.description;

        //2. Check the obtained information
        if(!service_name || !description){
            return res.status(400).json(
                {
                    success: false,
                    message: "Name and description cannot be empty!"
                }
            )
        }

        //3. Save info in our DataBase
        const newService = await Service.create(
            {   
                service_name: service_name,
                description: description
            }
        ).save();

        //4. Give a response to the page
        res.status(201).json(
            {
                success: true,
                message: "Service created successfully!",
                data: newService
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Service cannot be created",
                error: error
            }
        )
    }
} 

export const getAllServices = async (req: Request, res: Response) => {
    try {
        //1. Get information needed
        const services = await Service.find()

        //2. Respond to user
        res.status(200).json(
            {
                success: true,
                message: "Services retrived successfully!",
                data: services
            }
        )
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Services can't be retrieved",
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
                message: "Service updated successfully",
                data: updatedservice
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Service can't be updated",
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
            message: "Service deleted successfully",
            data: updatedservice
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Service can't be deleted",
            error: error
        })
    }
}