"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  MoreHorizontalIcon,
  PencilIcon,
  SaveIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";
import { DatePicker } from "@/components/datepicker";
import { Input } from "@/components/ui/input";

export function DataTable({ columns, data, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [datepicked, setDatepicked] = useState(Date.now());

  const handleEditClick = (row) => {
    setIsEditing(row.id);
    setEditedRow(row.original);
  };

  const handleDeleteClick = (row) => {
    setIsDeleting(row.id);
  };

  const handleCancelDeleteClick = () => {
    setIsDeleting(null);
  };

  const handleConfirmDeleteClick = (row) => {
    onDelete(row.original.id);
    setIsDeleting(null);
  };

  const handleSaveClick = () => {
    const formattedDate = new Date(datepicked).toLocaleDateString("en-GB");
    editedRow.date = formattedDate;
    onUpdate(editedRow);
    setIsEditing(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = () => {
    const formattedDate = new Date(datepicked).toLocaleDateString("en-GB");
    setEditedRow((prev) => ({ ...prev, date: formattedDate }));
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
              <TableHead>Actions</TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={"capitalize"}>
                    {isEditing === row.id ? (
                      cell.column.id === "date" ? (
                        <DatePicker
                          selected={new Date(editedRow.date)}
                          onChange={handleDateChange}
                          date={datepicked}
                          setDate={setDatepicked}
                        />
                      ) : cell.column.id === "time" ? (
                        <Input
                          type="time"
                          name="time"
                          value={editedRow.time}
                          onChange={handleChange}
                        />
                      ) : (
                        <Input
                          type="text"
                          name={cell.column.id}
                          value={editedRow[cell.column.id]}
                          onChange={handleChange}
                        />
                      )
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
                <TableCell className="w-[220px]">
                  {isDeleting === row.id ? (
                    <>
                      <Button variant="icon" onClick={() => handleConfirmDeleteClick(row)}>
                        <Trash2Icon className="text-red-500" />
                      </Button>
                      <Button variant="icon" onClick={handleCancelDeleteClick}>
                        <XIcon />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="icon"
                        onClick={() =>
                          isEditing === row.id
                            ? handleSaveClick()
                            : handleEditClick(row)
                        }
                      >
                        {isEditing === row.id ? <SaveIcon /> : <PencilIcon />}
                      </Button>
                      <Button variant="icon" onClick={() => handleDeleteClick(row)}>
                        <Trash2Icon />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className={"h-24 text-center"}
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
