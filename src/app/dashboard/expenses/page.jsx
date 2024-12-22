"use client";

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
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ExpensesPage() {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState("");

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
  function handleToggleRecurring() {
    setRecurring(!recurring);
  }

  function saveIncome() {
    if (!amount || !description) {
      console.log("Please fill all the fields");
      toast.error("Please fill all the fields");
      return;
    }
    console.log("Saving Expense...");
    console.log("Amount:", amount);
    console.log("Description:", description);
    console.log("Recurring:", recurring);
    console.log("Frequency:", frequency);
  }

  return (
    <div className="">
      <Dialog className="">
        <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
          <Plus /> Add new Expense
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new Expense</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Add a new expense to your account.
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
            <Button onClick={saveIncome}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
