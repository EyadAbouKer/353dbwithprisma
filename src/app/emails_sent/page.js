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
import { generate_and_send_emails_Monthly } from "@/actions/actions";
import { saveEmailsToDatabase } from "@/actions/actions";

export default function page() {
  const [tableData, setTableData] = useState([]);
  const [monthlyTableData, setMonthlyTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Calculate if both tables are visible
  const bothTablesVisible = !loading && tableData.length > 0 && monthlyTableData.length > 0;

  const generateEmailsOnSunday = async () => {
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

  const generateEmailsMonthly = async () => {
    setLoading(true);
    try {
      const data = await generate_and_send_emails_Monthly();
      console.log("Received data in client:", data);
      setMonthlyTableData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-center mb-8">Email Generation Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3 text-center">Weekly Notifications</h2>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={generateEmailsOnSunday}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                Generating...
              </span>
            ) : (
              "Generate Emails for Next Week"
            )}
          </Button>
        </div>

        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3 text-center">Monthly Notifications</h2>
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={generateEmailsMonthly}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                Generating...
              </span>
            ) : (
              "Generate Emails for Next Month"
            )}
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="h-8 w-8 border-t-2 border-b-2 border-blue-600 rounded-full animate-spin mb-4" />
          <p className="text-lg text-gray-600">Generating emails...</p>
        </div>
      )}

      <div className={`${bothTablesVisible ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : ''}`}>
        {!loading && tableData.length > 0 && (
          <div className={`mb-8 ${bothTablesVisible ? 'mb-0' : ''}`}>
            <div className="bg-white border rounded-lg shadow-sm h-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Weekly Email Preview
                </h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Email Date</TableHead>
                        <TableHead className="font-semibold">Sender Email</TableHead>
                        <TableHead className="font-semibold">Player Email</TableHead>
                        <TableHead className="font-semibold">Header</TableHead>
                        <TableHead className="font-semibold">Body</TableHead>
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
              <div className="border-t p-4 bg-gray-50 flex flex-col items-center gap-2 mt-auto">
                <p className="text-sm text-gray-600 font-medium">Save these emails to the database?</p>
                <Button 
                  onClick={() => saveEmailsToDatabase(tableData)} 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Save to Database
                </Button>
              </div>
            </div>
          </div>
        )}

        {!loading && monthlyTableData.length > 0 && (
          <div className={`mb-8 ${bothTablesVisible ? 'mb-0' : ''}`}>
            <div className="bg-white border rounded-lg shadow-sm h-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Monthly Email Preview
                </h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Email Date</TableHead>
                        <TableHead className="font-semibold">Sender Email</TableHead>
                        <TableHead className="font-semibold">Player Email</TableHead>
                        <TableHead className="font-semibold">Header</TableHead>
                        <TableHead className="font-semibold">Body</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyTableData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {new Date(row.EmailDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{row.SenderEmail}</TableCell>
                          <TableCell>{row.RecipientEmail}</TableCell>
                          <TableCell>{row.EmailSubject}</TableCell>
                          <TableCell>{row.BodyPreview}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="border-t p-4 bg-gray-50 flex flex-col items-center gap-2 mt-auto">
                <p className="text-sm text-gray-600 font-medium">Save these emails to the database?</p>
                <Button 
                  onClick={() => saveEmailsToDatabase(monthlyTableData)} 
                  className="bg-green-600 hover:bg-green-700"
                >
                  Save to Database
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
