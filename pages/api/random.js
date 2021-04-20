import { getPosts } from "../../lib/reddit";
import redis from "../../lib/redis";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
  const id = uuidv4();

  const posts = await getPosts({ subreddit: "random" });

  if (!posts) {
    res.status(500).send("Unable to load random posts");
    return;
  }

  // get the subreddit name and save
  const subreddit = posts[0].subreddit;
  redis.set(id, subreddit);

  res.status(200).json({ id, posts });
};
