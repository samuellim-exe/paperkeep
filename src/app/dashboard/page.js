import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { isAuthenticated, getUser } from "@/lib/auth";

export default async function Dashboard () {
    return (
      <>
        <h1>Dashboard</h1>
        <LogoutLink>
          <Button>Logout</Button>
        </LogoutLink>
        <Textarea value={JSON.stringify(await getUser())}></Textarea>
      </>
    );
}