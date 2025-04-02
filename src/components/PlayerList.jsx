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


export default async function PlayerList() {
  const playersList = await prisma.playerslist.findMany({
    include: {
      sessions: true
    }
  });

  const allPlayers = playersList.map((player) => (
    <TableRow key={`${player.ClubMemberID}-${player.SessionID}`}>
      <TableCell>{player.ClubMemberID}</TableCell>
      <TableCell>{player.TeamID}</TableCell>
      <TableCell>{player.Role}</TableCell>
      <TableCell>{player.SessionID}</TableCell>
      <TableCell>{player.sessions.Date?.toLocaleDateString()}</TableCell>
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
            <TableHead>Session ID</TableHead>
            <TableHead>Session Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPlayers}
        </TableBody>
      </Table>
    </div>
  );
}
