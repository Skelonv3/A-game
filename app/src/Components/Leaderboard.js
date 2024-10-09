const Leaderboard = ({ leaderboard }) => (
  // TODO :: Limit the leaderboard to 10 players
  <>
    <h2>Leaderboard</h2>
    <ul>
      {leaderboard.sort((p, n) => n.points - p.points).map((player, index) => <li key={index}>{player.name}: {player.points}</li>)}
    </ul>
  </>
)

export default Leaderboard;