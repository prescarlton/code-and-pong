import { Card } from "./ui/card"
interface LeaderboardPlayerProps {
  profilePic?: string
  firstName: string
  lastName: string
  position: number
}
const LeaderboardPlayer = ({ firstName, position }: LeaderboardPlayerProps) => {
  return (
    <Card className={`rounded-full px-8 py-4 flex items-center gap-2`}>
      <p className="text-xl font-bold">{position}</p>
      <p>{firstName}</p>
      <p className="ml-auto">100 points</p>
    </Card>
  )
}
export default LeaderboardPlayer
