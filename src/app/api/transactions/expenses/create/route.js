import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    const requestBody = await request.json();

    const data = {
        amount: parseFloat(requestBody.amount),
        description: requestBody.description,
        recurring: requestBody.recurring,
        transactionType: "EXPENSE",
        user: {
            connect: {
                kindeId: user.id,
            },
        },
    };
    if(requestBody.recurring) {
        data.recurringType = requestBody.frequency;
    }

    console.log(data);

    try {
        const res = await prisma.transaction.create({
            data,
        });
        console.log(res);
        return NextResponse.json({status: 200, data: res})
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({status: 500, message: "Internal Server Error"});
    }

}