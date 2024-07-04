import { Request, Response } from "express";
import { Service } from "../database/models/service";

export const createService = async (req: Request, res: Response) => {
  try {
    // 1. recuperar la informacion de la req
    const name = req.body.name;
    const nationality = req.body.nationality;

    // 2. Validar informacion
    if (!name) {
      return res.status(400).json(
        {
          success: false,
          message: "name is required"
        }
      )
    }

    if (!nationality) {
      return res.status(400).json(
        {
          success: false,
          message: "nationality is required"
        }
      )
    }

    // 3. Tratar informacion

    // 4. Atacar a la bd
    const newService = await Service.create(
      {
        name: name,
        nationality: nationality
      }
    ).save();

    // 5. Responder
    res.json(
      {
        success: true,
        message: 'Service created successfully',
        data: newService
      }
    )
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Error creating service"
      }
    )
  }
}

export const getAllServices = async(req: Request, res: Response) => {
  try {
    // 1. Recuperar la info de la BD
    const service = await Service.find()

    // 2. Responder la info de la bd
    res.json(
      {
        success: true,
        message: "All service retrieved successfully",
        data: authors
      }
    )

  } catch (error) {
    res.status(500).json(
      {
        success: false, 
        message: "Cant retrieve service",
        error: error
      }
    )
  }
}

export const updateServiceById = async (req: Request, res: Response) => {
  try {
      // 1. Recupera la info
      const serviceIdToUpdate = req.params.id
      const body = req.body

      // 2. validar la info

      // 3. trata la info

      // 4. Actualizar en bd
      const serviceUpdated = await Service.update(
        {
          id: parseInt(serviceIdToUpdate)
        },
        body
      )

      // 5. Responder
      res.status(200).json(
        {
          success: true,
          message: "Service updated",
          data: serviceUpdated
        }
      )      
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "service cant be updated",
        error: error
      }
    )
  }
}

export const deleteServiceById = async (req: Request, res: Response) => {
  try {
    // 1. recupera id
    const serviceIdToDelete = Number(req.params.id)
  
    // 2. Eliminar registro de la bd
    const serviceDeleted = await Service.delete(serviceIdToDelete)

    if(!authorDeleted.affected) {
      return res.status(404).json(
        {
          success: false,
          message: "Service doesnt exist"
        }
      )
    } 

    // 3. Responder
    res.status(200).json(
      {
        success: true,
        message: "service deleted successfully",
        data: serviceDeleted
      }
    )
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Error deleting service",
        error: error
      }
    )
  }
}