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

export default async function TeamInformation() {
  const teams = await prisma.teaminformation.findMany();
  console.log(teams);

  const allTeams = teams.map((team) => (
    <TableRow key={team.TeamID}>
      <TableCell>{team.TeamID}</TableCell>
      <TableCell>{team.TeamName}</TableCell>
      <TableCell>{team.Gender}</TableCell>
      <TableCell>{team.CaptinName}</TableCell>
      <TableCell>{team.LocationID}</TableCell>
      <TableCell>{team.CoachID}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team ID</TableHead>
            <TableHead>Team Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Captain Name</TableHead>
            <TableHead>Location ID</TableHead>
            <TableHead>Coach ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allTeams}
        </TableBody>
      </Table>
    </div>
  );
}
