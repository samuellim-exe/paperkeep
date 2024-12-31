"use client"

import { isLastDayOfMonth } from "date-fns";
import { useEffect, useState } from "react"
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export default function Dashboard () {
  const [tableData, setTableData] = useState([])

  async function fetchTransactions() {
    const response = await fetch("/api/transactions");
    const data = await response.json();

    let i = 0;

    const parsedData = data.data.map((item) => {
      i++;
      return {
        ...item,
        // count: i,
        date: new Date(item.createdAt).toLocaleDateString("en-MY"),
        time: new Date(item.createdAt).toLocaleTimeString("en-GB"),
        amount: item.amount.toFixed(2),
        transactionType: item.transactionType.toLowerCase(),
        // recurringType: item.recurring ? item.recurringType.toLowerCase() : "-",
      };
    });

    // Sort the parsed data by date and time
    parsedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Reset the count after sorting
    parsedData.forEach((item, index) => {
      item.count = index + 1;
    });

    setTableData(parsedData);
    console.log(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);
  
  console.log("tableData", tableData);
  return(
    <>
      <DataTable columns={columns} data={tableData}/>
    </>
  )
}