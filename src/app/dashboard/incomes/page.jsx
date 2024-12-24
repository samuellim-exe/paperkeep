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
import { Plus, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddDialog from "./_components/add-dialog";

export default function IncomesPage() {




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
        date: new Date(item.createdAt).toLocaleDateString("en-MY"),
        time: new Date(item.createdAt).toLocaleTimeString("en-GB"),
        amount: item.amount.toFixed(2),
        recurringType: item.recurring ? item.recurringType.toLowerCase() : "-",
      };
    });
    setTableData(parsedData);
    // console.log(data);
  }

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div>
      <AddDialog fetchIncomes={fetchIncomes}>
        <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
          <PlusIcon /> Add new Income
        </DialogTrigger>
        </AddDialog>
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
