"use client";

import { columns } from "@/app/dashboard/incomes/_components/columns";
import { DataTable } from "@/app/dashboard/incomes/_components/data-table";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function IncomesPage() {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
  function handleToggleRecurring() {
    setRecurring(!recurring);
  }
  function handleFrequencyChange(event) {
    setFrequency(event.target.value);
  }
  function handleDialogOpen() {
    setDialogOpen(!dialogOpen);
    setSubmitButtonDisabled(false);
  }

  // function saveIncome() {
  //   //check if all the fields are filled
  //   if (!amount || !description) {
  //     console.log("Please fill all the fields");
  //     toast.error("Please fill all the fields");
  //     return;
  //   }
  //   console.log("Saving income...");
  //   console.log("Amount:", amount);
  //   console.log("Description:", description);
  //   console.log("Recurring:", recurring);
  //   console.log("Frequency:", frequency);
  //   //
  //   useEffect(() => {
  //     async function sendreq() {
  //       const response = await fetch("/api/transactions/incomes/create", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           amount,
  //           description,
  //           recurring,
  //           frequency,
  //         }),
  //       });
  //       const data = await response.json();
  //       console.log(data);
  //     }
  //     sendreq();
  //   }, [amount, description, recurring, frequency]);
  //   console.log("Income saved:", income);
  // }

  const handleSaveIncome = async () => {
    if (!amount || !description) {
      console.log("Please fill all the fields");
      toast.error("Please fill all the fields");
      return;
    }
    if (recurring && !frequency) {
      console.log("Please select a frequency");
      toast.error("Please select a frequency");
      return;
    }
    try {
      const response = await fetch("/api/transactions/incomes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          description,
          recurring,
          frequency: frequency.toUpperCase(),
        }),
      });
      const data = await response.json();
      console.log(data);
      toast.success("Income saved successfully");
      setDialogOpen(false);
      setSubmitButtonDisabled(true);
      //reset the form
      setAmount(0);
      setDescription("");
      setRecurring(false);
      setFrequency("");
      //fetch the updated data
      fetchIncomes();
    } catch (err) {
      console.log(err.message)
      console.error(err);
      toast.error("An error occurred while saving the income");
    }
  };

  const [tableData, setTableData] = useState([]);

  async function fetchIncomes() {
    const response = await fetch("/api/transactions/incomes");
    const data = await response.json();
    let i = 0;
    //parse the date
    const parsedData = data.data.map((item) => {
      i++
      return {
        ...item,
        count: i,
        //format the date DD/MM/YYYY
        createdAt: new Date(item.createdAt).toLocaleDateString("en-MY"),
        amount: item.amount.toFixed(2),
        recurringType: item.recurring ? item.recurringType.toLowerCase() : "-",
      };
    });
    setTableData(parsedData);
    console.log(data);
  }

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={handleDialogOpen}>
        <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
          <Plus /> Add new Income
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new Income</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Add a new income to your account.
          </DialogDescription>
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            id="amount"
            placeholder="500.00"
            className="mb-1"
            value={amount}
            onChange={handleAmountChange}
          />
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            placeholder="Monthly Salary"
            className="mb-1"
            value={description}
            onChange={handleDescriptionChange}
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="recurring"
              checked={recurring}
              onCheckedChange={handleToggleRecurring}
            />
            <Label htmlFor="recurring">Recurring</Label>
          </div>
          {recurring && (
            <Select onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          )}
          <DialogFooter>
            <Button onClick={handleSaveIncome} disabled={submitButtonDisabled}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
