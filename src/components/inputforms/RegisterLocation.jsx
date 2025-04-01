"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addLocation } from "@/actions/actions";

const formSchema = z.object({
  Name: z.string().min(1).optional(),
  MaxCapacity: z.string().min(1).optional(),
  Phone: z.string().min(1).optional(),
  Adress: z.string().min(1).optional(),
  City: z.string().min(1).optional(),
  Province: z.string().min(1).optional(),
  PostalCode: z.string().min(1).optional(),
  WebAdress: z.string().min(1).optional(),
  Type: z.string().min(1).optional(),
});

export default function RegisterLocation() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [resultValue, setResultValue] = useState(null);

  async function onSubmit(values) {
    try {
      console.log("Form values:", values);
      const result = await addLocation(values);

      if (result.success) {
        toast.success("Location added successfully!");
      } else {
        toast.error("Failed to add location: " + result.error);
      }

      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );

      const storestate = await result;
      // console.log("Location added to the database:", storestate);
      setResultValue(storestate);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="MaxCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MaxCapacity</FormLabel>
                <FormControl>
                  <Input placeholder="MaxCapacity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Adress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adress</FormLabel>
                <FormControl>
                  <Input placeholder="Adress" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="City"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="Province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Input placeholder="Province" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="PostalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PostalCode</FormLabel>
                    <FormControl>
                      <Input placeholder="PostalCode" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="WebAdress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WebAdress</FormLabel>
                <FormControl>
                  <Input placeholder="WebAdress" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="Type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {resultValue && (
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-md bg-white border rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-700">
                Location Result
              </h3>
            </div>
            <div className="p-4">
              <pre className="bg-gray-100 p-4 rounded text-sm text-gray-800 overflow-auto">
                {JSON.stringify(resultValue, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
