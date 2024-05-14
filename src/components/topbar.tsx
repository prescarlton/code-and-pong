import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

const Topbar = () => {
  return (
    <div className="flex items-center justify-between px-8 py-4 fixed w-full">
      <Link href="/">
        <h2 className="text-2xl font-bold">🏓 CODE/+/PONG</h2>
      </Link>
      <UserButton />
    </div>
  )
}
export default Topbar
