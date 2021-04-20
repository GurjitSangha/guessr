import redis from "../../lib/redis";

export default async (req, res) => {
  const { id, guess } = req.body;

  const subreddit = await redis.get(id);

  if (!subreddit) {
    res.status(404).send("Unable to find game id");
    return;
  }

  let correct = false;
  if (subreddit == guess) correct = true;

  res.status(200).json({ id, guess, correct });
};
