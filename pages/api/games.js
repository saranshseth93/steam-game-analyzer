import axios from "axios";

const STEAM_API_KEY = process.env.STEAM_API_KEY;

async function fetchGameDetails(appid) {
  const url = `http://store.steampowered.com/api/appdetails?appids=${appid}`;
  try {
    const response = await axios.get(url);
    return response.data[appid].success ? response.data[appid].data : {};
  } catch (error) {
    console.error(`Error fetching details for appid ${appid}:`, error);
    return {};
  }
}

async function fetchGamesFromSteam(steamID) {
  const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/`;
  const params = {
    key: STEAM_API_KEY,
    steamid: steamID,
    format: "json",
    include_appinfo: true,
    include_played_free_games: 1,
  };

  try {
    const response = await axios.get(url, { params });
    const user = await axios.get(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&format=json&steamids=${steamID}`
    );
    const games = response.data.response.games || [];
    const userDetails = user.data.response.players[0];

    // Fetch details for a limited number of games to avoid performance issues
    const detailedGamesPromises = games.map(async (game) => {
      const details = await fetchGameDetails(game.appid);
      return {
        ...game,
        details,
      };
    });

    let detailedGames = await Promise.all(detailedGamesPromises);
    detailedGames.user = user.data.response.players[0];
    return { games: detailedGames, user: userDetails };
  } catch (error) {
    console.error("Error fetching games from Steam:", error);
    throw error;
  }
}

export default async function handler(req, res) {
  const { input } = req.query;
  let steamID = input;

  try {
    const games = await fetchGamesFromSteam(steamID);
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
