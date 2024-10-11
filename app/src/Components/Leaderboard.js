const Leaderboard = ({ leaderboard }) => (
  // TODO :: Limit the leaderboard to 10 players
  <div className="flex flex-wrap w-form justify-start">
    <h2 className="m-2 bg-yellow w-form h-form block border border-black border-solid text-center font-bold">Leaderboard</h2>
    <ol className="mt-2 w-full">
      {leaderboard.sort((p, n) => n.points - p.points).slice(0, 10).map((player, index) => (
        <div className='flex'>
          <div className="ml-2 w-7 h-form bg-yellow border border-black border-solid text-center font-bold">{`${index+1}.`}</div>
          <li className=' text-white bg-light-green w-leaderboard h-form border border-black border-solid text-center font-bold' key={index}>{player.name}: {player.points}</li>
        </div>
      ))}
    </ol>
  </div>
)

export default Leaderboard;