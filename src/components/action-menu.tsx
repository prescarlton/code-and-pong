"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"

const ActionMenu = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((prev) => !prev)

  return (
    <div
      className={`${open ? "p-4 bg-primary/20" : "bg-primary"} fixed bottom-8 right-8 rounded-md flex flex-col items-end transition-all gap-2`}
    >
      {open && (
        <>
          <Link href="score-keeper">
            <Button>Start New Round</Button>
          </Link>
          <Link href="past-round">
            <Button>Enter Past Round</Button>
          </Link>
        </>
      )}
      <Button size="icon" className={`w-12 h-12`} onClick={toggleOpen}>
        <Plus
          className={`transition-all ${open ? "transform rotate-45" : ""}`}
        />
      </Button>
    </div>
  )
}
export default ActionMenu
