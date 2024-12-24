import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TransactionType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const requestBody = await request.json();
  let formattedDate = `${new Date(requestBody.date).toDateString()} ${
    requestBody.time
    }`;
    console.log(formattedDate);
  const data = {
    amount: parseFloat(requestBody.amount),
    description: requestBody.description,
    recurring: requestBody.recurring,
    createdAt: new Date(formattedDate),
    transactionType: "INCOME",
    user: {
      connect: {
        kindeId: user.id,
      },
    },
  };
  if (requestBody.recurring) {
    data.recurringType = requestBody.frequency;
  }

  console.log(JSON.stringify(data));
  try {
    const res = await prisma.transaction.create({
      data,
    });
    // console.log(res);
    return NextResponse.json({ status: 200, data: res });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
