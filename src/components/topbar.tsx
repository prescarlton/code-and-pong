import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "./ui/button"

const Topbar = () => {
  const user = useUser()
  return (
    <div className="flex items-center justify-between px-8 py-4 fixed w-full">
      <Link href="/">
        <h2 className="text-2xl font-bold">🏓 CODE/+/PONG</h2>
      </Link>
      {user ? (
        <UserButton />
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>

          <Link href="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
export default Topbar
