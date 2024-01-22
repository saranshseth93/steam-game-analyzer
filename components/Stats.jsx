import React from "react";

const calculateStats = (games) => {
  const totalGamesOwned = games.length;
  const totalPlaytime =
    games.reduce((total, game) => total + game.playtime_forever, 0) / 60;
  const mostPlayedGame =
    games.length > 0
      ? games.reduce((max, game) =>
          max.playtime_forever > game.playtime_forever ? max : game
        ).name
      : "N/A";

  return { totalGamesOwned, totalPlaytime, mostPlayedGame };
};

const Stats = ({ games }) => {
  const { totalGamesOwned, totalPlaytime, mostPlayedGame } =
    calculateStats(games);

  return (
    <div className="text-white px-4">
      <p className="cyberpunk-bullet">Total Games Owned: {totalGamesOwned}</p>
      <p className="cyberpunk-bullet">
        Total Playtime: {totalPlaytime.toFixed(2)} hours
      </p>
      <p className="cyberpunk-bullet">Most Played Game: {mostPlayedGame}</p>
    </div>
  );
};

export default Stats;
