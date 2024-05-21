import { Card } from "./ui/card"
interface LeaderboardPlayerProps {
  profilePic?: string
  fullName: string
  position: number
  points: number
}
const LeaderboardPlayer = ({
  fullName,
  position,
  points,
}: LeaderboardPlayerProps) => {
  return (
    <Card className={`rounded-full px-8 py-4 flex items-center gap-2`}>
      <p className="text-xl font-bold">{position}</p>
      <p>{fullName.split(" ")[0]}</p>
      <p className="ml-auto">{points} points</p>
    </Card>
  )
}
export default LeaderboardPlayer
