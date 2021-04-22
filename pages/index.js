import { useState } from "react";
import Head from "next/head";
import Posts from "../components/Posts";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import dummy from "../lib/dummy";
import { startGame, sendGuess } from "../lib/api";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [guess, setGuess] = useState("");
  const [gameId, setGameId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackStyle, setFeedbackStyle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startNewGame = async () => {
    setFeedback("");
    setPostCount(0);
    setIsLoading(true);
    try {
      const { data } = await startGame();
      setIsLoading(false);
      console.log(data);
      setGameId(data.id);
      setPosts(data.posts);
      setPostCount(4);
    } catch (err) {
      setIsLoading(false);
      console.log(err.response);
      setFeedback(err.response.data.message);
    }

    //Dummy
    // setGameId(dummy.id);
    // setPosts(dummy.posts);
    // setPostCount(4);
  };

  const showMorePosts = () => {
    if (postCount <= 20) {
      setPostCount(postCount + 4);
    }
  };

  const displayFeedback = (correct) => {
    if (correct) {
      setFeedback("Correct!");
      setFeedbackStyle("bg-green-400 text-white border-green-500");
    } else {
      setFeedback("Incorrect, please try again");
      setFeedbackStyle("bg-red-400 text-white border-red-500");
    }
  };

  const handleSubmit = async () => {
    setFeedback("");
    setFeedbackStyle("");
    setIsSubmitting(true);
    try {
      const { data } = await sendGuess({
        id: gameId,
        guess: guess.toLowerCase(),
      });
      setIsSubmitting(false);
      console.log(data);
      displayFeedback(data.correct);
    } catch (err) {
      setIsSubmitting(false);
      console.log(err.response);
      setFeedback(err.response.data.message);
    }
  };

  return (
    <div className="pt-12">
      <div className="container mx-auto">
        <Head>
          <title>GuessReddit</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />

        <div className="flex flex-col sm:flex-row justify-center mb-4 gap-4">
          <button
            className="bg-green-400 text-white p-3 rounded"
            onClick={startNewGame}
          >
            New Game
          </button>

          <div className="flex">
            <input
              type="text"
              name="guess"
              id="guess"
              placeholder="Enter your guess here"
              onChange={(e) => setGuess(e.target.value)}
              className="p-3 flex-grow border-2 outline-none border-r-0 rounded-l border-gray-400 focus:border-gray-400"
            />
            <input
              type="submit"
              value="Submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="p-3 bg-blue-500 disabled:opacity-50 rounded-r text-white border-2 border-gray-400  border-l-0"
            />
          </div>
        </div>

        <div
          className={`${feedbackStyle} text-center mb-4 p-4 max-w-max mx-auto border-1 rounded`}
        >
          {feedback}
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <Posts
            posts={posts}
            postCount={postCount}
            showMorePosts={showMorePosts}
          />
        )}
      </div>
    </div>
  );
}
