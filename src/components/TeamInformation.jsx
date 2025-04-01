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
  const teams = await prisma.teaminformation.findMany({
    include: {
      personnelroles: true,
      locations: true,
    }
  });

  const allTeams = teams.map((team) => (
    <TableRow key={team.TeamID}>
      <TableCell>{team.TeamID}</TableCell>
      <TableCell>{team.TeamName}</TableCell>
      <TableCell>{team.Gender}</TableCell>
      <TableCell>{team.CaptainName}</TableCell>
      <TableCell>{team.locations?.LocationName || 'N/A'}</TableCell>
      <TableCell>{team.personnelroles?.PersonnelName || 'N/A'}</TableCell>
    </TableRow>
  ));

  return (
    <div className="p-4">
      {/* <h2 className="text-2xl font-bold mb-4">Team Information</h2> */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team ID</TableHead>
              <TableHead>Team Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Captain Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Coach Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allTeams}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
