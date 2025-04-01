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
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { addPayment } from "@/actions/actions";

const formSchema = z.object({
  ClubMemberID: z.string().min(1),
  PaymentDate: z.coerce.date().optional(),
  Amount: z.string(),
  Method: z.string().optional(),
  MembershipStartDate: z.coerce.date().optional(),
  MembershipEndDate: z.coerce.date().optional(),
  InstallmentNumber: z.string().min(1).optional(),
  ExcessDonation: z.string().min(1).optional(),
});

export default function RegisterPayment() {
  const methods = [
    { label: "Credit Card", value: "Credit" },
    { label: "Debit Card", value: "Debit" },
    { label: "Cash", value: "Cash" },
  ];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PaymentDate: new Date(),
      MembershipStartDate: new Date(),
      MembershipEndDate: new Date(),
    },
  });

  // Define a state variable to store the result.
  const [resultValue, setResultValue] = useState(null);

  async function onSubmit(values) {
    try {
      const promise = addPayment(values);

      toast.promise(promise, {
        loading: "Adding payment...",
        success: () => {
          form.reset();
          return (
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Payment added successfully!</span>
            </div>
          );
        },
        error: "Failed to add payment.",
      });

      // Await the promise and store the result.
      const result = await promise;
      console.log("Payment added to the database:", result);
      setResultValue(result); // Update state with the result
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="ClubMemberID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Club Member ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Club Member ID" {...field} />
                    </FormControl>
                    <FormDescription>Unique identifier for the club member.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="PaymentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Payment Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Date of the payment.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="Amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Amount" type="number" {...field} />
                    </FormControl>
                    <FormDescription>Total payment amount.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="Method"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Payment Method</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? methods.find(
                                  (method) => method.value === field.value
                                )?.label
                              : "Select Method"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search payment method..." />
                          <CommandList>
                            <CommandEmpty>No valid payment method found.</CommandEmpty>
                            <CommandGroup>
                              {methods.map((method) => (
                                <CommandItem
                                  value={method.label}
                                  key={method.value}
                                  onSelect={() => {
                                    form.setValue("Method", method.value);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      method.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {method.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select the payment method.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="MembershipStartDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Membership Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Start date of the membership.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="MembershipEndDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Membership End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>End date of the membership.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="InstallmentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Installment Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Installment Number (1 to 4)"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Number of installments (1 to 4).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ExcessDonation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excess Donation</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Excess Donation" type="text" {...field} />
                </FormControl>
                <FormDescription>Additional donation amount, if any.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
      {/* Render the returned value after form submission */}
      {resultValue && (
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-md bg-white border rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-700">Payment Result</h3>
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
