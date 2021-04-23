import { getPosts } from "../../lib/reddit";
import { connectRedis, disconnectRedis } from "../../lib/redis";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
  const id = uuidv4();

  const { posts, subreddit } = await getPosts({
    subreddit: "random",
    limit: 24,
  });

  if (!posts) {
    res
      .status(500)
      .json({ message: "Unable to load posts, please try again later" });
    return;
  }

  try {
    connectRedis().set(id, subreddit.toLowerCase());
    disconnectRedis();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Unable to load posts, please try again later" });
  }

  res.status(200).json({ id, subreddit, subLength: subreddit.length, posts });
};
