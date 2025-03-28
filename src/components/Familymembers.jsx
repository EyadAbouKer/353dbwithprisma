import prisma from "@/lib/db";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead, // ...assuming TableHead is not needed otherwise...
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function FamilyMembers() {
  // Query with all relationships included
  const familyMembers = await prisma.familymembers.findMany({
    include: {
      clubmembers: true,
      locations: true,
      familyrelationships: true,
    },
  });

  const allFamilyMembers = familyMembers.map((member) => (
    <TableRow key={member.FamilyMemberID}>
      <TableCell>{member.FamilyMemberID}</TableCell>
      <TableCell>{member.FirstName}</TableCell>
      <TableCell>{member.LastName}</TableCell>
      <TableCell>{member.Email}</TableCell>
      <TableCell>{member.Phone}</TableCell>
      <TableCell>{new Date(member.DOB).toLocaleDateString()}</TableCell>
      <TableCell>{member.Status}</TableCell>
      <TableCell>{member.SIN}</TableCell>
      <TableCell>{member.MedicareNumber}</TableCell>
      <TableCell>{member.Address}</TableCell>
      <TableCell>{member.City}</TableCell>
      <TableCell>{member.Province}</TableCell>
      <TableCell>{member.Postalcode}</TableCell>
      <TableCell>{member.clubmembers.length}</TableCell>
      <TableCell>{member.locations ? member.locations.LocationID : "N/A"}</TableCell>
      <TableCell>{member.familyrelationships.length}</TableCell>
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
            <TableCell>Status</TableCell>
            <TableCell>SIN</TableCell>
            <TableCell>Medicare #</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Province</TableCell>
            <TableCell>Postal Code</TableCell>
            <TableCell>Club Members</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Family Relationships</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allFamilyMembers}
        </TableBody>
      </Table>
    </div>
  );
}
