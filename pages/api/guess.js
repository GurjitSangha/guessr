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

  const guessPad = guess.padEnd(subreddit.length);
  const hangmanArr = [];
  for (let i = 0; i < subreddit.length; i++) {
    const dupe = guessPad[i] == subreddit[i];
    hangmanArr.push(dupe ? guessPad[i] : "_");
  }
  const hangman = hangmanArr.join(" ");

  res.status(200).json({
    id,
    guess,
    correct: subreddit == guess,
    similarity: stringSimilarity.compareTwoStrings(subreddit, guess),
    hangman,
  });
};
