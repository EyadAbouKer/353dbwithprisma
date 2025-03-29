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

export default async function FamilyRelationships() {
  const familyRelationships = await prisma.familyrelationships.findMany();
  console.log(familyRelationships);

  const allFamilyRelationships = familyRelationships.map((relationship) => (
    <TableRow key={relationship.RelationshipID}>
      <TableCell>{relationship.RelationshipID}</TableCell>
      <TableCell>{relationship.FamilyMemberID}</TableCell>
      <TableCell>{relationship.ClubMemberID}</TableCell>
      <TableCell>{relationship.Relationship}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Relationship ID</TableHead>
            <TableHead>Family Member ID</TableHead>
            <TableHead>Club Member ID</TableHead>
            <TableHead>Relationship</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allFamilyRelationships}
        </TableBody>
      </Table>
    </div>
  );
}
