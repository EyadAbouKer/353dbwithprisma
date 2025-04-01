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

export default async function Primaryfamilyrelationships() {
  const familyRelationships = await prisma.primaryfamilyrelationships.findMany({
    include: {
      familymembers: true,
      clubmembers: true,
    },
  });

  const allFamilyRelationships = familyRelationships.map((relationship) => (
    <TableRow key={`${relationship.FamilyMemberID}-${relationship.ClubMemberID}`}>
      <TableCell>{relationship.FamilyMemberID}</TableCell>
      <TableCell>{relationship.ClubMemberID}</TableCell>
      <TableCell>{relationship.Relationship}</TableCell>
      <TableCell>{relationship.familymembers.Name}</TableCell>
      <TableCell>{relationship.clubmembers.Name}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Family Member ID</TableHead>
            <TableHead>Club Member ID</TableHead>
            <TableHead>Relationship</TableHead>
            <TableHead>Family Member Name</TableHead>
            <TableHead>Club Member Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allFamilyRelationships}
        </TableBody>
      </Table>
    </div>
  );
}
