import snoowrap from "snoowrap";

function getSnoo() {
  return new snoowrap({
    userAgent: process.env.REDDIT_USER_AGENT,
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    refreshToken: process.env.REDDIT_REFRESH_TOKEN,
  });
}

async function getRandomHotPosts(limit = 1) {
  const r = getSnoo();
  const posts = await r.getSubreddit("random").getHot({ limit });
  const result = posts
    .filter((post) => !post.stickied)
    .map((post) => ({
      title: post.title,
      subreddit: post.subreddit.display_name,
      url: post.url,
      id: `t3_${post.id}`,
    }));
  return result;
}

export default async (req, res) => {
  res.status(200).json(await getRandomHotPosts());
};
