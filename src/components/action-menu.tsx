import Link from "next/link"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"

const ActionMenu = () => {
  return (
    <Link href="/score-keeper">
      <Button size="icon" className="w-12 h-12 fixed bottom-8 right-8">
        <Plus />
      </Button>
    </Link>
  )
}
export default ActionMenu
