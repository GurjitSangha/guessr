import { useState } from "react";
import Head from "next/head";
import Posts from "../components/Posts";
import Header from "../components/Header";
import dummy from "../lib/dummy";
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
      setPostCount(4);
    } catch (err) {
      console.log(err.response);
      setFeedback(err.response.data.message);
    }

    //Dummy
    // setPosts(dummy.posts);
    // setPostCount(4);
  };

  const showMorePosts = () => {
    if (postCount <= 20) {
      setPostCount(postCount + 4);
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

  return (
    <div className="pt-12">
      <div className="container mx-auto">
        <Head>
          <title>Reddit Guesser</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />

        <div className="flex justify-center mb-4 gap-4">
          <button
            className="bg-green-400 text-white p-3 rounded"
            onClick={startNewGame}
          >
            New Game
          </button>

          <div className="">
            <input
              type="text"
              name="guess"
              id="guess"
              placeholder="Enter your guess here"
              onChange={(e) => setGuess(e.target.value)}
              className="p-3 border-2 outline-none border-r-0 rounded-l border-gray-400 focus:border-gray-400"
            />
            <input
              type="submit"
              value="Submit"
              onClick={handleSubmit}
              className="p-3 bg-blue-500 rounded-r text-white border-2 border-gray-400  border-l-0"
            />
          </div>
        </div>

        <div className="text-center mb-4">{feedback}</div>

        <Posts
          posts={posts}
          postCount={postCount}
          showMorePosts={showMorePosts}
        />
      </div>
    </div>
  );
}
