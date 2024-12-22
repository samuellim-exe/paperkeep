import { ColumnDef } from "@tanstack/react-table";

export const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "recurringType",
        header: "Recurring",
    }

]