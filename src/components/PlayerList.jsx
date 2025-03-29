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

export default async function PlayerList() {
  const playersList = await prisma.playerslist.findMany();
  console.log(playersList);

  const allPlayers = playersList.map((player) => (
    <TableRow key={`${player.ClubMemberID}-${player.TeamID}`}>
      <TableCell>{player.ClubMemberID}</TableCell>
      <TableCell>{player.TeamID}</TableCell>
      <TableCell>{player.Role}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Club Member ID</TableHead>
            <TableHead>Team ID</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPlayers}
        </TableBody>
      </Table>
    </div>
  );
}
