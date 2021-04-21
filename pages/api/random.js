import { getPosts } from "../../lib/reddit";
import { connectRedis, disconnectRedis } from "../../lib/redis";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
  const id = uuidv4();

  const { posts, subreddit } = await getPosts({
    subreddit: "random",
    limit: 25,
  });

  if (!posts) {
    res.status(500).send("Unable to load random posts");
    return;
  }

  connectRedis().set(id, subreddit.toLowerCase());
  disconnectRedis();

  res.status(200).json({ id, subreddit, posts });
};
