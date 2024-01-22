import React, { useState } from "react";
import GamesGrid from "@/components/GamesGrid";
import Head from "next/head";
import Stats from "@/components/Stats";

const HomePage = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [user, setUser] = useState({});
  const [showStats, setShowStats] = useState(false);
  const [showStatsButton, setShowStatsButton] = useState(false);
  const [fetchComplete, setFetchComplete] = useState(false);

  const handleFetchGames = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/games?input=${input}`);
    const data = await response.json();
    setIsLoading(false);
    setFetchComplete(true);

    if (data && data.games) {
      setGames(data.games);
      setShowStatsButton(true);
    }
    if (data && data.user) {
      setUser(data.user);
    }
  };

  const handleShowStats = () => {
    setShowStats(!showStats);
  };

  const Spinner = () => {
    return <img src="/loader.svg" alt="spinner" className="w-5 h-5 mr-2" />;
  };

  return (
    <>
      <Head>
        <title>Steam Game Analyser</title>
        <meta
          name="description"
          content="This website analyses your steam games from your steam ID"
        />
        <link rel="icon" href="/steam.png" />
      </Head>
      <div className="flex items-center justify-center flex-col gap-3 mt-16">
        <h1 className="text-5xl font-valorax mb-10 text-center">
          Steam Games Analyser
        </h1>
        <input
          type="text"
          value={input}
          placeholder="Enter Your Steam ID"
          onChange={(e) => setInput(e.target.value)}
          className="input input-bordered input-accent w-full max-w-xs"
        />
        <button
          className="btn btn-accent flex items-center"
          onClick={handleFetchGames}
        >
          {isLoading && <Spinner />}
          Get Games
        </button>
        {fetchComplete && games.length === 0 && (
          <div role="alert" className="alert alert-error w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Error! Either you dont have any games or you have entered wrong
              steam ID.
            </span>
          </div>
        )}
        {showStatsButton && (
          <>
            <h2 className="text-3xl mt-10 mb-5">Hello, {user.personaname}</h2>
            <div className="collapse collapse-arrow w-auto">
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-lg font-medium">
                Show personal stats
              </div>
              <div className="collapse-content">
                <Stats games={games} />
              </div>
            </div>
          </>
        )}
      </div>
      <div>{games.length > 0 && <GamesGrid games={games} />}</div>
    </>
  );
};

export default HomePage;
