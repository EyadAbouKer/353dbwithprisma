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

export default async function Session() {
  const sessions = await prisma.session.findMany();
  // console.log(sessions);

  const allSessions = sessions.map((session) => (
    <TableRow key={session.SessionID}>
      <TableCell>{session.SessionID}</TableCell>
      <TableCell>{session.LocationID ?? "N/A"}</TableCell>
      <TableCell>
        {session.DateTime 
          ? new Date(session.DateTime).toLocaleString()
          : "N/A"}
      </TableCell>
      <TableCell>{session.Team1ID ?? "N/A"}</TableCell>
      <TableCell>{session.Team2ID ?? "N/A"}</TableCell>
      <TableCell>{session.ScoreTeam1 ?? "N/A"}</TableCell>
      <TableCell>{session.ScoreTeam2 ?? "N/A"}</TableCell>
      <TableCell>{session.GenderMatch ?? "N/A"}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Session ID</TableHead>
            <TableHead>Location ID</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Team 1 ID</TableHead>
            <TableHead>Team 2 ID</TableHead>
            <TableHead>Team 1 Score</TableHead>
            <TableHead>Team 2 Score</TableHead>
            <TableHead>Gender Match</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allSessions}
        </TableBody>
      </Table>
    </div>
  );
}
