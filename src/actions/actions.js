"use server";

import { PrismaClient } from "@prisma/client";
import { parse } from "date-fns";
const prisma = new PrismaClient();

// __________________________________________LOCATION__________________________________________________
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
      .then(response => {
        console.log("Location added to the database", response);
        return response;
      });
    return { success: true, data: result };
  } catch (error) {
    console.error("Error adding location:", error);
    return { success: false, error: error.message };
  }
}

// __________________________________________FAMILYMEMBERS__________________________________________________
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




// __________________________________________PAYMENTS__________________________________________________
// someone come to pay --> check ID if valid (can it be checked without going to the db?)
// check age if over 18 on payment date --> if yes --> set status to inactive (not very important)
// if sum of all payments for a given id is over 100, mark it as excess donation.
// ATTENTION: need to add logic for Date here
export async function addPayment(formData) {
  try {
    // Check if the family member exists
    const id = await prisma.clubmembers.findUnique({
      where: { ClubMemberID: parseInt(formData.ClubMemberID) },
    });

    if (!id) {
      console.log("club member ID not found");
      return { success: false, error: "club member ID not found" };
    }

    // Create a new payment
    const result = await prisma.payments.create({
      data: {
        Amount: parseFloat(formData.Amount),
        PaymentDate: formData.PaymentDate,
        Method: formData.Method,
        ClubMemberID: parseInt(formData.ClubMemberID),
        InstallmentNumber: parseInt(formData.InstallmentNumber),
      },
    });

    console.log("Payment added to the database:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error adding payment:", error);
    return { success: false, error: error.message };
  }
}
