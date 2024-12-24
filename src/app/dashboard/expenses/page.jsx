"use client";

import { columns } from "@/app/dashboard/expenses/_components/columns";
import { DataTable } from "@/app/dashboard/expenses/_components/data-table";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Plus, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddDialog from "./_components/add-dialog";
import { DialogTrigger } from "@/components/ui/dialog";

export default function ExpensesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [tableData, setTableData] = useState([]);

  async function fetchExpenses() {
    const response = await fetch("/api/transactions/expenses");
    const data = await response.json();

    let i = 0;
    //parse the date
    const parsedData = data.data.map((item) => {
      i++;
      return {
        ...item,
        //count items
        count: i,
        //format the date
        date: new Date(item.createdAt).toLocaleDateString("en-MY"),
        time: new Date(item.createdAt).toLocaleTimeString("en-GB"),
        amount: item.amount.toFixed(2),
        recurringType: item.recurring ? item.recurringType.toLowerCase() : "-",
      };
    });
    setTableData(parsedData);
    console.log(data);
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="">
      <Button
        className={cn(buttonVariants({ variant: "default" }))}
        onClick={() => setDialogOpen(true)}
      >
        <PlusIcon /> Add new Income
      </Button>
      <AddDialog
        fetchExpenses={fetchExpenses}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      ></AddDialog>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
