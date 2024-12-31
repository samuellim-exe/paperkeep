"use client";

import { columns } from "@/app/dashboard/incomes/_components/columns";
import { DataTable } from "@/app/dashboard/incomes/_components/data-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddDialog from "./_components/add-dialog";
import { DialogTrigger } from "@/components/ui/dialog";

export default function IncomesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [tableData, setTableData] = useState([]);

  async function fetchIncomes() {
    const response = await fetch("/api/transactions/incomes");
    const data = await response.json();
    let i = 0;
    //parse the date
    const parsedData = data.data.map((item) => {
      i++;
      return {
        ...item,
        // count: i,
        //format the date DD/MM/YYYY
        date: new Date(item.createdAt).toLocaleDateString("en-MY"),
        time: new Date(item.createdAt).toLocaleTimeString("en-GB"),
        amount: item.amount.toFixed(2),
        recurringType: item.recurring ? item.recurringType.toLowerCase() : "-",
      };
    });
    // Sort the parsed data by date and time
    parsedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Reset the count after sorting
    parsedData.forEach((item, index) => {
      item.count = index + 1;
    });

    setTableData(parsedData);
    // console.log(data);
  }

  async function updateIncome(updatedIncome) {
    const response = await fetch("/api/transactions/incomes/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedIncome),
    });

    if (response.ok) {
      toast.success("Income updated successfully");
      fetchIncomes();
    } else {
      toast.error("Failed to update income");
    }
  }

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div>
      <Button
        className={cn(buttonVariants({ variant: "default" }))}
        onClick={() => setDialogOpen(true)}
      >
        <PlusIcon /> Add new Income
      </Button>
      <AddDialog
        fetchIncomes={fetchIncomes}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      ></AddDialog>
      <DataTable columns={columns} data={tableData} onUpdate={updateIncome} />
    </div>
  );
}
