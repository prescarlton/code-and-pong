"use client"
import { useState, useEffect } from "react"
import { BellIcon, CheckIcon, XIcon } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Badge } from "./ui/badge"
import listMyGameRequests, {
  GameRequestWithOpponent,
} from "@/actions/list-my-game-requests"
import confirmGameRequest from "@/actions/confirm-game-request"
import denyGameRequest from "@/actions/deny-game-request"
import { toast } from "sonner"

export const GameRequestDropdown = () => {
  const [gameRequests, setGameRequests] = useState<GameRequestWithOpponent[]>(
    [],
  )

  useEffect(() => {
    const loadGameRequests = async () => {
      const requests = await listMyGameRequests()
      setGameRequests(requests)
    }
    loadGameRequests()
  }, [])

  const onConfirm = async (id: string) => {
    toast.promise(confirmGameRequest(id), {
      success: () => {
        setGameRequests((prev) => prev.filter((request) => request.id !== id))
        return "Game confirmed"
      },
      error: "Error confirming game",
    })
  }

  const onDeny = async (id: string) => {
    toast.promise(denyGameRequest(id), {
      success: () => {
        setGameRequests((prev) => prev.filter((request) => request.id !== id))
        return "Game denied"
      },
      error: "Error denying game",
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="relative">
          <BellIcon className="h-5 w-5" />
          {gameRequests.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {gameRequests.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {gameRequests.length === 0 ? (
          <DropdownMenuItem>No new game requests</DropdownMenuItem>
        ) : (
          gameRequests.map((request) => (
            <DropdownMenuItem
              key={request.id}
              className="flex flex-col items-start p-4"
              onClick={(e) => e.preventDefault()}
            >
              <div className="flex justify-between w-full mb-2">
                <span className="font-semibold">
                  {request.opponent.fullName}
                </span>
                <span className="text-sm text-muted-foreground">
                  {new Date(request.created).toLocaleDateString()}
                </span>
              </div>
              <div className="mb-2">
                Score: {request.myScore} - {request.opponentScore}
              </div>
              <div className="flex gap-2 w-full">
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => onDeny(request.id)}
                >
                  <XIcon className="w-4 h-4 mr-2" />
                  Deny
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => onConfirm(request.id)}
                >
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Confirm
                </Button>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
