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

export default async function Payments() {
  const payments = await prisma.payments.findMany();
  // console.log(payments);

  const allPayments = payments.map((payment) => (
    <TableRow key={payment.PaymentID}>
      <TableCell>{payment.PaymentID}</TableCell>
      <TableCell>{payment.ClubMemberID}</TableCell>
      <TableCell>{payment.PaymentDate.toISOString().split('T')[0]}</TableCell>
      <TableCell>${payment.Amount.toFixed(2)}</TableCell>
      <TableCell>{payment.Method}</TableCell>
      <TableCell>{payment.MembershipStartDate.toISOString().split('T')[0]}</TableCell>
      <TableCell>{payment.MembershipEndDate.toISOString().split('T')[0]}</TableCell>
      <TableCell>{payment.InstallmentNumber}</TableCell>
      <TableCell>${payment.ExcessDonation?.toFixed(2) ?? "0.00"}</TableCell>
      <TableCell>{payment.IsActive}</TableCell>
    </TableRow>
  ));

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
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPayments}
        </TableBody>
      </Table>
    </div>
  );
}
