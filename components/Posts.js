import Post from "./Post";

export default function Posts({ posts, postCount, showMorePosts }) {
  let postCards = [];
  for (let i = 0; i < postCount; i++) {
    postCards.push(<Post post={posts[i]} key={i} />);
  }

  return (
    <div className="posts">
      <div className="md:grid md:grid-cols-4 md:gap-2 mb-4">{postCards}</div>
      {postCount > 0 && postCount < 24 && (
        <div className="flex justify-items-center">
          <button
            className="mx-auto bg-gray-400 text-white px-2 py-4 rounded mb-8"
            onClick={showMorePosts}
          >
            Show More Posts
          </button>
        </div>
      )}
    </div>
  );
}
