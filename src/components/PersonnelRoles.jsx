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

export default async function PersonnelRoles() {
  const personnelRoles = await prisma.personnelroles.findMany();
  console.log(personnelRoles);

  const allPersonnelRoles = personnelRoles.map((role) => (
    <TableRow key={`${role.PersonnelID}-${role.LocationID}-${role.Role}-${role.StartDate}`}>
      <TableCell>{role.PersonnelID}</TableCell>
      <TableCell>{role.LocationID}</TableCell>
      <TableCell>{role.Role}</TableCell>
      <TableCell>{role.StartDate.toISOString().split('T')[0]}</TableCell>
      <TableCell>{role.EndDate ? role.EndDate.toISOString().split('T')[0] : 'Active'}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Personnel ID</TableHead>
            <TableHead>Location ID</TableHead>
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
