import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <LoginLink>
        <Button>Login</Button>
      </LoginLink>

      <RegisterLink >
        <Button>Register</Button>
      </RegisterLink>
    </>
  );
}
