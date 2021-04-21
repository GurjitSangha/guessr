import { connectRedis, disconnectRedis } from "../../lib/redis";

export default async function handler(req, res) {
  const { id } = req.body;

  const subreddit = await connectRedis().get(id);
  disconnectRedis();

  if (!subreddit) {
    res.status(404).send("Unable to find game id");
    return;
  }

  res.status(200).json({ id, subreddit });
}
