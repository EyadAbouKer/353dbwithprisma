import prisma from "@/lib/db";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Personnel() {
  const personnel = await prisma.personnel.findMany();
  console.log(personnel);

  const allPersonnel = personnel.map((person) => (
    <TableRow key={person.PersonnelID}>
      <TableCell>{person.PersonnelID}</TableCell>
      <TableCell>{person.FirstName}</TableCell>
      <TableCell>{person.LastName}</TableCell>
      <TableCell>{person.Mandate}</TableCell>
      <TableCell>{person.Role}</TableCell>
      <TableCell>{person.DOB.toISOString().split('T')[0]}</TableCell>
      <TableCell>{person.SIN}</TableCell>
      <TableCell>{person.MedicareNumber}</TableCell>
      <TableCell>{person.Phone}</TableCell>
      <TableCell>{person.Address}</TableCell>
      <TableCell>{person.City}</TableCell>
      <TableCell>{person.Province}</TableCell>
      <TableCell>{person.PostalCode}</TableCell>
      <TableCell>{person.Email}</TableCell>
      <TableCell>{person.LocationID}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Personnel ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Mandate</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>SIN</TableHead>
            <TableHead>Medicare Number</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Province</TableHead>
            <TableHead>Postal Code</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPersonnel}
        </TableBody>
      </Table>
    </div>
  );
}
