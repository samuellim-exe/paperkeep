import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    const res = await prisma.transaction.findMany({
        where: {
            userKindeId: user.id,
            transactionType: "INCOME"
        }
    })
    // console.log(res)
    return NextResponse.json({status: 200, data: res})
}