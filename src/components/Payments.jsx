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


export default async function Payments() {
  const payments = await prisma.payments.findMany();
  // console.log(payments);

  const allPayments = payments.map((payment) => {
    const paymentDate = payment.PaymentDate
      ? new Date(payment.PaymentDate)
      : null;
    const startDate = payment.MembershipStartDate
      ? new Date(payment.MembershipStartDate)
      : null;
    const endDate = payment.MembershipEndDate
      ? new Date(payment.MembershipEndDate)
      : null;

    return (
      <TableRow key={payment.PaymentID}>
        {/* <TableCell>
          <Button>Edit</Button>
        </TableCell>
        <TableCell>
          <Button>Delete</Button>
        </TableCell> */}
        <TableCell>{payment.PaymentID}</TableCell>
        <TableCell>{payment.ClubMemberID}</TableCell>
        <TableCell>
          {paymentDate ? paymentDate.toISOString().split("T")[0] : "N/A"}
        </TableCell>
        <TableCell>${payment.Amount.toFixed(2)}</TableCell>
        <TableCell>{payment.Method}</TableCell>
        <TableCell>
          {startDate ? startDate.toISOString().split("T")[0] : "N/A"}
        </TableCell>
        <TableCell>
          {endDate ? endDate.toISOString().split("T")[0] : "N/A"}
        </TableCell>
        <TableCell>{payment.InstallmentNumber}</TableCell>
        <TableCell>${payment.ExcessDonation?.toFixed(2) ?? "0.00"}</TableCell>
      </TableRow>
    );
  });

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payment ID</TableHead>
            <TableHead>Club Member ID</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Membership Start</TableHead>
            <TableHead>Membership End</TableHead>
            <TableHead>Installment #</TableHead>
            <TableHead>Excess Donation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{allPayments}</TableBody>
      </Table>
    </div>
  );
}
