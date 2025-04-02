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
import { Button } from "./ui/button";


export default async function Secondaryfamilyrelationships() {
  const relationships = await prisma.secondaryfamilyrelationships.findMany({
    include: {
      clubmembers: true,
      secondaryfamilymembers: true,
    },
  });

  const allRelationships = relationships.map((rel) => (
    <TableRow key={`${rel.ClubMemberID}-${rel.SecondaryID}`}>
      <TableCell>{rel.ClubMemberID}</TableCell>
      <TableCell>{rel.clubmembers?.FirstName ?? "N/A"}</TableCell>
      <TableCell>{rel.secondaryfamilymembers?.FirstName ?? "N/A"}</TableCell>
      <TableCell>{rel.Relationship ?? "N/A"}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Club Member ID</TableHead>
            <TableHead>Club Member Name</TableHead>
            <TableHead>Secondary Member Name</TableHead>
            <TableHead>Relationship</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allRelationships}
        </TableBody>
      </Table>
    </div>
  );
}
