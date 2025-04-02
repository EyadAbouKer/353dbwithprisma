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


export default async function SecondaryFamilyMembers() {
  const secondaryMembers = await prisma.secondaryfamilymembers.findMany({
    include: {
      secondaryfamilyrelationships: true,
    },
  });

  const allSecondaryMembers = secondaryMembers.map((member) => (
    <TableRow key={member.SecondaryID}>
      <TableCell>{member.SecondaryID}</TableCell>
      <TableCell>{member.FirstName ?? "N/A"}</TableCell>
      <TableCell>{member.LastName ?? "N/A"}</TableCell>
      <TableCell>{member.Phone ?? "N/A"}</TableCell>
      <TableCell>
        {member.secondaryfamilyrelationships.map(rel => rel.RelationType).join(", ") || "N/A"}
      </TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Secondary ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Relationship</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allSecondaryMembers}
        </TableBody>
      </Table>
    </div>
  );
}
