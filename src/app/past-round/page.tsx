"use client"
import createGame from "@/actions/create-game"
import listUsers, { ShortUser } from "@/actions/listUsers"
import PageWrapper from "@/components/page-wrapper"
import Topbar from "@/components/topbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import useSWR from "swr"

export default function PastRoundPage() {
  const [opponent, setOpponent] = useState<null | ShortUser>(null)
  const [loading, setLoading] = useState(false)
  const [myScore, setMyScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const router = useRouter()
  const { data: users, isLoading: usersLoading } = useSWR(
    "list-users",
    listUsers,
  )
  const onClick = async () => {
    setLoading(true)
    await createGame({
      opponentId: opponent!.id,
      myScore,
      opponentScore,
    })
      .then(() => {
        router.push("/")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Topbar />
      <PageWrapper title="Enter Past Round Scores">
        <div className="flex flex-col gap-4">
          {usersLoading ? (
            <p className="flex-1">Loading...</p>
          ) : (
            <div className="flex flex-col flex-1 gap-1">
              <p>Select an opponent</p>
              {users?.length ? (
                <Select
                  onValueChange={(id) =>
                    setOpponent(users.find((user) => user.id === id)!)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select opponent" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex flex-row items-center gap-2">
                          <div className="w-8 h-8 rounded-full relative overflow-hidden">
                            <Image
                              src={user.imageUrl}
                              alt={user.fullName || "User"}
                              fill
                            />
                          </div>
                          <p>{user.fullName}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p>No Opponents found</p>
              )}
            </div>
          )}
          {opponent && (
            <>
              <div className="flex flex-col gap-1 items-center">
                <p>My Score</p>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    onClick={() => setMyScore((prev) => prev - 1)}
                  >
                    <Minus />
                  </Button>
                  <Input
                    value={myScore}
                    readOnly
                    className="w-12 text-center"
                  />
                  <Button
                    size="icon"
                    onClick={() => setMyScore((prev) => prev + 1)}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <p>{`${opponent.fullName}'s Score`}</p>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    onClick={() => setOpponentScore((prev) => prev - 1)}
                  >
                    <Minus />
                  </Button>
                  <Input
                    value={opponentScore}
                    readOnly
                    className="w-12 text-center"
                  />
                  <Button
                    size="icon"
                    onClick={() => setOpponentScore((prev) => prev + 1)}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
              <Button onClick={onClick} loading={loading}>
                Save Round
              </Button>
            </>
          )}
        </div>
      </PageWrapper>
    </>
  )
}
