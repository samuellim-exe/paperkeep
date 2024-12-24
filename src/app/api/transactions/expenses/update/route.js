import { NextResponse } from "next/server";

export async function UPDATE(req){
    const requestBody = await req.json();
    console.log(requestBody);
    return NextResponse.json({status: 200, data: requestBody});
}