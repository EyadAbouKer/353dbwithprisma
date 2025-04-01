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

export default async function EmailLog() {
  const emails = await prisma.emaillog.findMany();

  const allEmails = emails.map((email) => (
    <TableRow key={email.LogID}>
      <TableCell>{email.LogID}</TableCell>
      <TableCell>{new Date(email.EmailDate).toLocaleString() ?? "N/A"}</TableCell>
      <TableCell>{email.SenderEmail ?? "N/A"}</TableCell>
      <TableCell>{email.RecipientEmail ?? "N/A"}</TableCell>
      <TableCell>{email.CCList ?? "N/A"}</TableCell>
      <TableCell>{email.EmailSubject ?? "N/A"}</TableCell>
      <TableCell>{email.BodyPreview ?? "N/A"}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Log ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>CC List</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{allEmails}</TableBody>
      </Table>
    </div>
  );
}
