"use client"

import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  // const {isAuthenticated} = useKindeBrowserClient();
  // isAuthenticated && redirect("/dashboard");
  redirect("/dashboard");
  return (
    <>
      {/* <LoginLink>
        <Button>Login</Button>
      </LoginLink>

      <RegisterLink >
        <Button>Register</Button>
      </RegisterLink> */}
    </>
  );
}
