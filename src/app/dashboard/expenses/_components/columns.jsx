import { ColumnDef } from "@tanstack/react-table";

export const columns = [
  {
    accessorKey: "count",
    header: "Count",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
//   {
//     accessorKey: "recurringType",
//     header: "Recurring",
//   },
];