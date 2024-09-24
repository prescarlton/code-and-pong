import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "./ui/button"
import { auth } from "@clerk/nextjs/server"
import { BellIcon } from "lucide-react"
import { GameRequestDropdown } from "./game-requests-dropdown"

const Topbar = () => {
  const { userId } = auth()
  return (
    <div className="flex items-center justify-between px-8 py-4 fixed w-full">
      <Link href="/">
        <h2 className="text-2xl font-bold">🏓 CODE/+/PONG</h2>
      </Link>
      {userId ? (
        <div className="flex items-center gap-2">
          <GameRequestDropdown />
          <UserButton />
        </div>
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
