import { useState, useLocal ,useEffect } from "react";
import '../App.css';

const GameTable = ({data}) => {

  console.log(data);
  const game_date = data[0].game_date;
  const teams = data[0].teams;

  const renderTeamRow = (team) => {
    return(
    <div>
      Score: {team.score}
      {team.team_members[0]}, {team.team_members[1]}, {team.team_members[2]}
    </div>)
  }

  return (
    <div className="">
        The was played on {game_date}
        {teams.map(team => renderTeamRow(team))}
    </div>
  );
}

export default GameTable;
