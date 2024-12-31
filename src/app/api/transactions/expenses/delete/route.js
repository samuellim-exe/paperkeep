import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const { id } = await request.json();

  try {
    await prisma.transaction.delete({
      where: { id },
    });
    return NextResponse.json({ status: 200, message: "Expense deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
