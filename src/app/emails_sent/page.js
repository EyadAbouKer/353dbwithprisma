"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { generate_and_send_emails_on_sunday } from "@/actions/actions";
import { saveEmailsToDatabase } from "@/actions/actions";

export default function page() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const data = await generate_and_send_emails_on_sunday();
      console.log("Received data in client:", data);
      setTableData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-center">
        <Button
          className="w-full max-w-sm"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Emails for Next Week"}
        </Button>
      </div>

      {loading && <div className="text-center">Loading...</div>}

      {!loading && tableData.length > 0 && (
        <div>
          <div className="border rounded-lg overflow-hidden">
            <div className="border rounded-lg ">
              <h1 className="text-2xl font-bold mb-4 text-center">
                Players to be notified next week
              </h1>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email Date</TableHead>
                    <TableHead>Sender Email</TableHead>
                    <TableHead>Player Email</TableHead>
                    <TableHead>Header</TableHead>
                    <TableHead>Body</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(row.emailDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{row.senderEmail}</TableCell>
                      <TableCell>{row.playerEmail}</TableCell>
                      <TableCell>{row.header}</TableCell>
                      <TableCell>{row.body}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex items-center flex-col justify-center mt-4">
            <h1>Do you want to save emails in DB?</h1>
            <Button 
              onClick={() => saveEmailsToDatabase(tableData)} 
              className="w-full max-w-sm"
            >
              log to database
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
