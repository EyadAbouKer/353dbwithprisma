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

export default async function Locations() {
  const locations = await prisma.locations.findMany();
  // console.log(locations);

  const allLocations = locations.map((location) => (
    <TableRow key={location.LocationID}>
      <TableCell>{location.LocationID}</TableCell>
      <TableCell>{location.Name ?? "N/A"}</TableCell>
      <TableCell>{location.MaxCapacity ?? "N/A"}</TableCell>
      <TableCell>{location.Phone ?? "N/A"}</TableCell>
      <TableCell>{location.Address ?? "N/A"}</TableCell>
      <TableCell>{location.City ?? "N/A"}</TableCell>
      <TableCell>{location.Province ?? "N/A"}</TableCell>
      <TableCell>{location.PostalCode ?? "N/A"}</TableCell>
      <TableCell>{location.WebAddress ?? "N/A"}</TableCell>
      <TableCell>{location.Type ?? "N/A"}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Max Capacity</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Province</TableHead>
            <TableHead>Postal Code</TableHead>
            <TableHead>Web Address</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allLocations}
        </TableBody>
      </Table>
    </div>
  );
}
