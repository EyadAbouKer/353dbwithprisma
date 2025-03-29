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

export default async function ClubMembers() {
  const clubMembers = await prisma.clubmembers.findMany();
  console.log(clubMembers);

  const allClubMembers = clubMembers.map((member) => (
    <TableRow key={member.ClubMemberID}>
      <TableCell>{member.ClubMemberID}</TableCell>
      <TableCell>{member.FirstName}</TableCell>
      <TableCell>{member.LastName}</TableCell>
      <TableCell>{member.DOB.toISOString().split("T")[0]}</TableCell>
      <TableCell>{member.Age}</TableCell>
      <TableCell>{member.Height ?? "N/A"}</TableCell>
      <TableCell>{member.Weight ?? "N/A"}</TableCell>
      <TableCell>{member.SIN}</TableCell>
      <TableCell>{member.MedicareNumber}</TableCell>
      <TableCell>{member.Phone}</TableCell>
      <TableCell>{member.Address}</TableCell>
      <TableCell>{member.City ?? "N/A"}</TableCell>
      <TableCell>{member.Province}</TableCell>
      <TableCell>{member.Postalcode}</TableCell>
      <TableCell>{member.FamilyMemberID}</TableCell>
      <TableCell>{member.Status}</TableCell>
      <TableCell>{member.TeamID ?? "N/A"}</TableCell>
    </TableRow>
  ))

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Club Member ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Height</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>SIN</TableHead>
            <TableHead>Medicare Number</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Province</TableHead>
            <TableHead>Postal Code</TableHead>
            <TableHead>Family Member ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Team ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allClubMembers}
        </TableBody>
      </Table>
    </div>
  );
}
