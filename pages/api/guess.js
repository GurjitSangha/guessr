import { connectRedis, disconnectRedis } from "../../lib/redis";
import stringSimilarity from "string-similarity";

export default async (req, res) => {
  const { id, guess } = req.body;

  const subreddit = await connectRedis().get(id);
  disconnectRedis();

  if (!subreddit) {
    res.status(404).json({
      message: "Game not found, please try starting a new game",
    });
    return;
  }

  res.status(200).json({
    id,
    guess,
    correct: subreddit == guess,
    similarity: stringSimilarity.compareTwoStrings(subreddit, guess),
  });
};
