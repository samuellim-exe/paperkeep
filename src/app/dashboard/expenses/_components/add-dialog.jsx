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
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function AddDialog({ children, fetchExpenses }) {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleDialogOpen() {
    setDialogOpen(!dialogOpen);
    setSubmitButtonDisabled(false);
  }
  function handleAmountChange(event) {
    setAmount(event.target.value);
  }
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
  function handleToggleRecurring() {
    setRecurring(!recurring);
  }

  const handleSaveExpense = async () => {
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
      const response = await fetch("/api/transactions/expenses/create", {
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
      toast.success("Expense saved successfully");
      setDialogOpen(false);
      setSubmitButtonDisabled(true);
      //reset the form
      setAmount(0);
      setDescription("");
      setRecurring(false);
      setFrequency("");
      //fetch updated data
      fetchExpenses();
    } catch (err) {
      console.log(err.message);
      console.error(err);
      toast.error("An error occured while saving the expense");
    }
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogOpen}>
      {children}
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
          <Button onClick={handleSaveExpense} disabled={submitButtonDisabled}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
