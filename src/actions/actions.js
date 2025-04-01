"use server";

import { PrismaClient } from '@prisma/client'
import { parse } from 'date-fns';
const prisma = new PrismaClient()

export async function addLocation(formData) {
    try {
        const result = await prisma.locations.create({
            data: {
                Name: formData.Name,
                MaxCapacity: parseInt(formData.MaxCapacity),
                Phone: formData.Phone,
                Address: formData.Adress,
                City: formData.City,
                Province: formData.Province,
                PostalCode: formData.PostalCode,
                WebAddress: formData.WebAdress,
                Type: formData.Type
            }
        }).then(console.log("Location added to the database", result))
        return { success: true, data: result }
    } catch (error) {
        console.error("Error adding location:", error)
        return { success: false, error: error.message }
    }
}
