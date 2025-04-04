import prisma from "@/lib/db";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

export default async function FamilyMembers() {
  // Query with primary relationships included
  const familyMembers = await prisma.familymembers.findMany({
    include: {
      primaryfamilyrelationships: true,
    },
  });

  const allFamilyMembers = familyMembers.map((member) => (
    <TableRow key={member.FamilyMemberID}>
      {/* <TableCell>
        <Button>Edit</Button>
      </TableCell>
      <TableCell>
        <Button>Delete</Button>
      </TableCell> */}
      <TableCell>{member.FamilyMemberID}</TableCell>
      <TableCell>{member.FirstName}</TableCell>
      <TableCell>{member.LastName}</TableCell>
      <TableCell>{member.Email}</TableCell>
      <TableCell>{member.Phone}</TableCell>
      <TableCell>
        {member.DOB ? new Date(member.DOB).toLocaleDateString() : "N/A"}
      </TableCell>
      <TableCell>{member.SIN}</TableCell>
      <TableCell>{member.MedicareNumber}</TableCell>
      <TableCell>{member.Address}</TableCell>
      <TableCell>{member.City}</TableCell>
      <TableCell>{member.Province}</TableCell>
      <TableCell>{member.Postalcode}</TableCell>
      <TableCell>{member.primaryfamilyrelationships.length}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>SIN</TableCell>
            <TableCell>Medicare #</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Province</TableCell>
            <TableCell>Postal Code</TableCell>
            <TableCell>Primary Relationships</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>{allFamilyMembers}</TableBody>
      </Table>
    </div>
  );
}
