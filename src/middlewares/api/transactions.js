import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const transactionsApiMiddleware = async ({request}) => {
        const {isAuthenticated, getUser} = getKindeServerSession();
        const isUserAuthenticated = await isAuthenticated()
        const user = await getUser()
        if(isUserAuthenticated){
                console.log("transactionsAPIMiddleware: User is authenticated")
                console.log(user.username)
            return NextResponse.next()
        }
        return NextResponse.json({message: "Not Authenticated", status: 401})
} 
//TODO: use fetch() to get transaction data from the api route