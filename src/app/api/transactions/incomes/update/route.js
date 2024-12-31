import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const requestBody = await req.json();
  const { id, description, amount, date, time } = requestBody;
  console.log("updated date", date);
  console.log("updated time", time);
  const [day, month, year] = date.split("/");
  let formattedDate = new Date(`${year}-${month}-${day}T${time}`);
  console.log("formatted date", formattedDate);
  try {
    const updatedIncome = await prisma.transaction.update({
      where: { id },
      data: {
        description,
        amount: parseFloat(amount),
        createdAt: formattedDate,
      },
    });
    return NextResponse.json({ status: 200, data: updatedIncome });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
