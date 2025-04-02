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


export default async function PersonnelRoles() {
  const personnelRoles = await prisma.personnelroles.findMany({
    include: {
      personnel: true,
      locations: true,
    }
  });

  const allPersonnelRoles = personnelRoles.map((role) => (
    <TableRow key={`${role.PersonnelID}-${role.LocationID}-${role.Role}-${role.StartDate}`}>
      <TableCell>{role.PersonnelID}</TableCell>
      <TableCell>{role.personnel.FirstName} {role.personnel.LastName}</TableCell>
      <TableCell>{role.LocationID}</TableCell>
      <TableCell>{role.locations.Name}</TableCell>
      <TableCell>{role.Role}</TableCell>
      <TableCell>{role.StartDate ? role.StartDate.toISOString().split('T')[0] : 'N/A'}</TableCell>
      <TableCell>{role.EndDate ? role.EndDate.toISOString().split('T')[0] : 'Active'}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location ID</TableHead>
            <TableHead>Location Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPersonnelRoles}
        </TableBody>
      </Table>
    </div>
  );
}
