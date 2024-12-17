import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id) {
    throw new Error("something went wrong with authentication" + user);
  }

  console.log("userId:", user.id);

  let dbUser = await prisma.user.findUnique({
    where: { kindeId: user.id },
  });

  console.log("dbUser:", dbUser ?? "no user found");

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        kindeId: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "", // Using nullish coalescing operator to provide a default empty string value
        username: user.username ?? "",
      },
    });
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
