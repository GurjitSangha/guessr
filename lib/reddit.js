import snoowrap from "snoowrap";

const r = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN,
});

const getImagePreview = ({ post, size }) => {
  const ress = post.preview?.images[0]?.resolutions;
  if (!ress) return "";

  return ress.filter((res) => res.width == size)[0].url;
};

const getLargestPreview = ({ post }) => {
  const ress = post.preview?.images[0]?.resolutions;
  if (!ress) return "";

  return ress.reduce((prev, curr) => {
    return prev.width > curr.width ? prev : curr;
  }).url;
};

const getPosts = async ({ subreddit, limit = 1, after = "" }) => {
  const result = await r.getSubreddit(subreddit).getHot({ limit, after });
  const posts = result
    .filter((post) => !post.stickied)
    .map((post) => ({
      title: post.title.replace(`"`, `'`),
      url: post.url,
      thumbnail: getImagePreview({ post, size: "108" }),
      largest: getLargestPreview({ post }),
      id: `t3_${post.id}`,
    }));
  return { posts, subreddit: result[0].subreddit.display_name };
};

export default r;
export { getPosts };
