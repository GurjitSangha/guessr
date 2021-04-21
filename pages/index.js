import { useState } from "react";
import Head from "next/head";
import Post from "../components/Post";
import data from "../lib/data";
import { startGame, sendGuess } from "../lib/api";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [guess, setGuess] = useState("");
  const [gameId, setGameId] = useState("");
  const [feedback, setFeedback] = useState("");

  const startNewGame = async () => {
    setFeedback("");
    try {
      const { data } = await startGame();
      console.log(data);
      setGameId(data.id);
      setPosts(data.posts);
      setPostCount(5);
    } catch (err) {
      console.log(err.response);
      setFeedback(err.response.data.message);
    }
  };

  const showMorePosts = () => {
    if (postCount <= 20) {
      setPostCount(postCount + 5);
    }
  };

  const handleSubmit = async () => {
    setFeedback("");
    try {
      const { data } = await sendGuess({
        id: gameId,
        guess: guess.toLowerCase(),
      });
      console.log(data);
      if (data.correct) {
        setFeedback("Correct!");
      } else {
        setFeedback("Incorrect, try again");
      }
    } catch (err) {
      console.log(err.response);
      setFeedback(err.response.data.message);
    }
  };

  let postCards = [];
  for (let i = 0; i < postCount; i++) {
    postCards.push(<Post data={posts[i]} key={i} />);
  }

  return (
    <div className="container mx-auto">
      <Head>
        <title>Reddit Guesser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button
        className="mx-auto bg-green-400 text-white px-2 py-4 rounded"
        onClick={startNewGame}
      >
        New Game
      </button>

      <input
        type="text"
        name="guess"
        id="guess"
        placeholder="Enter your guess here"
        onChange={(e) => setGuess(e.target.value)}
      />
      <input type="submit" value="Submit" onClick={handleSubmit} />
      <div className="feedback">{feedback}</div>

      <div className="md:grid md:grid-cols-5 md:gap-2 posts">{postCards}</div>
      {postCount > 0 && postCount < 25 && (
        <button
          className="mx-auto bg-gray-400 text-black px-2 py-4 rounded"
          onClick={showMorePosts}
        >
          Show more posts
        </button>
      )}
    </div>
  );
}
