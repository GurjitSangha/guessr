import Post from "./Post";

export default function Posts({ posts, postCount, showMorePosts }) {
  let postCards = [];
  for (let i = 0; i < postCount; i++) {
    postCards.push(<Post data={posts[i]} key={i} />);
  }

  return (
    <div className="posts">
      <div className="md:grid md:grid-cols-5 md:gap-2 mb-4">{postCards}</div>
      {postCount > 0 && postCount < 25 && (
        <div className="flex justify-items-center">
          <button
            className="mx-auto bg-gray-400 text-white px-2 py-4 rounded"
            onClick={showMorePosts}
          >
            Show More Posts
          </button>
        </div>
      )}
    </div>
  );
}
