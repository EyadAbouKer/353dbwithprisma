"use server";

import { PrismaClient } from "@prisma/client";
import { parse } from "date-fns";
const prisma = new PrismaClient();

export async function addLocation(formData) {
  try {
    const result = await prisma.locations
      .create({
        data: {
          Name: formData.Name,
          MaxCapacity: parseInt(formData.MaxCapacity),
          Phone: formData.Phone,
          Address: formData.Adress,
          City: formData.City,
          Province: formData.Province,
          PostalCode: formData.PostalCode,
          WebAddress: formData.WebAdress,
          Type: formData.Type,
        },
      })
      .then(console.log("Location added to the database", result));
    return { success: true, data: result };
  } catch (error) {
    console.error("Error adding location:", error);
    return { success: false, error: error.message };
  }
}

//need to show error if operation get rejected by the db to the UI
export async function addFamilyMember(formData) {
  try {
    // Check if the club member exists
    const clubMember = await prisma.clubmembers.findUnique({
      where: { ClubMemberID: parseInt(formData.ClubMemberID) },
    });

    if (!clubMember) {
      console.log("Club member ID not found");
      return { success: false, error: "Club member ID not found" };
    }

    // Create a new family member
    const result = await prisma.familymembers.create({
      data: {
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        MedicareNumber: formData.MedicareNumber,
        SIN: formData.SIN,
        Email: formData.Email,
        Address: formData.Address,
        City: formData.City,
        Province: formData.Province,
        Postalcode: formData.PostalCode,
        Phone: formData.Phone,
        DOB: formData.DOB
      },
    });

    console.log("Family member added to the database:", result);
    if (result){
        update_ClubMember_FamilyMember_Relationship(result.FamilyMemberID, formData.ClubMemberID, formData.Relationship);
    }
    return { success: true, data: result };
  } catch (error) {
    console.error("Error adding family member:", error);
    return { success: false, error: error.message };
  }
}

async function update_ClubMember_FamilyMember_Relationship(familyMemberID, ClubMemberID, Realtionship){
    try {
        const result = await prisma.primaryfamilyrelationships.create({
        data: {
            FamilyMemberID: parseInt(familyMemberID),
            ClubMemberID: parseInt(ClubMemberID),
            Relationship: Realtionship,
        },
        });
        console.log("Family relationship added to the database", result);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error adding family relationship:", error);
        return { success: false, error: error.message };
    }
}
