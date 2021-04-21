import { connectRedis, disconnectRedis } from "../../lib/redis";

export default async (req, res) => {
  const { id, guess } = req.body;

  if (!id || !guess) {
    res.status(400).json({ message: "Missing ID" });
    return;
  }

  const subreddit = await connectRedis().get(id);
  disconnectRedis();

  if (!subreddit) {
    res.status(404).json({ message: "Unable to find game ID" });
    return;
  }

  let correct = false;
  if (subreddit == guess) correct = true;

  res.status(200).json({ id, guess, correct });
};
