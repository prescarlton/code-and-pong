"use client"
import createGame from "@/actions/create-game"
import listUsers, { ShortUser } from "@/actions/listUsers"
import PageWrapper from "@/components/page-wrapper"
import Topbar from "@/components/topbar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import useSWR from "swr"

export default function PastRoundPage() {
  const [opponent, setOpponent] = useState("")
  const [loading, setLoading] = useState(false)
  const [myScore, setMyScore] = useState("")
  const [error, setError] = useState("")
  const [opponentScore, setOpponentScore] = useState("")
  const router = useRouter()
  const { data: users, isLoading: usersLoading } = useSWR(
    "list-users",
    listUsers,
  )
  const validateScores = (score1: number, score2: number) => {
    if (score1 < 0 || score2 < 0) {
      return "Scores cannot be negative"
    }
    if (Math.max(score1, score2) < 11) {
      return "At least one player must score 11 points"
    }
    if (Math.abs(score1 - score2) < 2) {
      return "The winning player must win by at least 2 points"
    }
    if (score1 === score2) {
      return "The scores cannot be tied"
    }
    return ""
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!opponent) {
      setError("Please select an opponent")
      return
    }
    const myScoreNum = parseInt(myScore)
    const opponentScoreNum = parseInt(opponentScore)

    const validationError = validateScores(myScoreNum, opponentScoreNum)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    await createGame({
      opponentId: opponent,
      myScore: myScoreNum,
      opponentScore: opponentScoreNum,
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
      <Topbar isSignedIn={true} />
      <PageWrapper>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              🏓 Enter Match Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="opponent">Select Opponent</Label>
                <Select value={opponent} onValueChange={setOpponent} required>
                  <SelectTrigger id="opponent">
                    <SelectValue placeholder="Choose an opponent" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.map((opp) => (
                      <SelectItem key={opp.id} value={opp.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage
                              src={opp.imageUrl}
                              alt={opp.fullName || "User profile"}
                            />
                            <AvatarFallback>
                              {opp.fullName?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          {opp.fullName}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="yourScore">Your Score</Label>
                <Input
                  id="yourScore"
                  type="number"
                  min="0"
                  value={myScore}
                  onChange={(e) => setMyScore(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="opponentScore">{"Opponent's Score"}</Label>
                <Input
                  id="opponentScore"
                  type="number"
                  min="0"
                  value={opponentScore}
                  onChange={(e) => setOpponentScore(e.target.value)}
                  required
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </div>
                </Alert>
              )}

              <Button type="submit" className="w-full" loading={loading}>
                Submit Score
              </Button>
            </form>
          </CardContent>
        </Card>
      </PageWrapper>
    </>
  )
}
