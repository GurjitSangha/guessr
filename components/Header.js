export default function Header() {
  return (
    <div className="py-18 px-6 text-center text-gray-700 dark:text-gray-300">
      <h1 className="text-4xl font-bold leading-snug mb-4">
        <span className="bg-clip-text bg-gradient-to-r text-transparent from-blue-500 to-red-500">
          GuessReddit
        </span>
      </h1>
      <p className="text-lg mb-4">
        Can you guess the subreddit from its post titles?
      </p>
      <p className="text-sm mb-8">
        Warning: The posts are from a randomly selected subreddit, so you might
        see some NSFW content.
      </p>
    </div>
  );
}
