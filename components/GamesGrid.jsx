import React from "react";
import GameCard from "./GameCard";
import moment from "moment";

const GamesGrid = ({ games }) => {
  const sortedGames = [...games].sort(
    (a, b) => b.playtime_forever - a.playtime_forever
  );
  return (
    <div className="container mx-auto p-4 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedGames.map((game, index) => {
          const { name, details, playtime_forever, rtime_last_played } = game;
          const url = details?.header_image;
          const playTime = Math.floor((playtime_forever * 60) / 3600);
          const lastPlayed = moment
            .unix(rtime_last_played)
            .format("DD/MM/YYYY hh:mmA");
          const desc = `Playtime: ${playTime} hours`;
          const isFree = details?.is_free;
          if (url) {
            return (
              <GameCard
                key={index}
                title={name}
                imgUrl={url}
                description={desc}
                lastPlayed={lastPlayed}
                isFree={isFree}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default GamesGrid;
