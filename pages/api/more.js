import redis from "../../lib/redis";
import { getPosts } from "../../lib/reddit";

export default async function handler(req, res) {
  const { id, after } = req.query;

  const subreddit = await redis.get(id);

  if (!subreddit) {
    res.status(404).send("Unable to find game id");
    return;
  }

  const posts = await getPosts({ subreddit, after });

  if (!posts) {
    res.send(500).send("Unable to load posts");
    return;
  }

  res.status(200).json(posts);
}
