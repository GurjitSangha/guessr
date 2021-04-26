import { useState } from "react";
import Head from "next/head";
import Posts from "../components/Posts";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import dummy from "../lib/dummy";
import { startGame, sendGuess, sendGiveUp } from "../lib/api";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [guess, setGuess] = useState("");
  const [gameId, setGameId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackStyle, setFeedbackStyle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hintText, setHintText] = useState("");
  const [hangman, setHangman] = useState("");

  const resetFeedback = () => {
    setFeedback("");
    setFeedbackStyle("");
  };

  const startNewGame = async () => {
    resetFeedback();
    setPostCount(0);
    setHintText("");
    setHangman("");
    setGuess("");
    setIsLoading(true);
    try {
      const { data } = await startGame();
      setIsLoading(false);
      setGameId(data.id);
      setPosts(data.posts);
      setPostCount(4);
      setHintText(`The correct subreddit name has ${data.subLength} letters`);
    } catch (err) {
      setIsLoading(false);
      displayFeedback({ data: err.response.data, error: true });
    }

    //Dummy
    // setGameId(dummy.id);
    // setPosts(dummy.posts);
    // setPostCount(4);
    // setHintText(`The correct subreddit name has ${dummy.subLength} letters`);
  };

  const showMorePosts = () => {
    if (postCount <= 20) {
      setPostCount(postCount + 4);
    }
  };

  const displayFeedback = ({ data, error = false, giveUp = false }) => {
    if (error) {
      setFeedbackStyle("bg-red-400 text-white border-red-500");
      setFeedback(
        data.message
          ? data.message
          : "Something went wrong, please try again later"
      );
      return;
    }

    if (giveUp) {
      setFeedbackStyle("bg-blue-400 text-white border-blue-500");
      setFeedback(
        `Unlucky! <a href="https://reddit.com/r/${data.subreddit}" target="_blank">The correct subreddit was /r/${data.subreddit}</a>`
      );
      return;
    }

    if (data.correct) {
      setFeedback(
        `Correct! <a href='https://reddit.com/r/${data.guess}' target='_blank'>Click here to go to /r/${data.guess}</a>`
      );
      setFeedbackStyle("bg-green-400 text-white border-green-500");
      setHangman("");
      setHintText("");
    } else if (data.similarity > 0.8) {
      setFeedbackStyle("bg-yellow-600 text-white border-yellow-500");
      setFeedback("Incorrect, but you are close!");
    } else {
      setFeedbackStyle("bg-red-400 text-white border-red-500");
      setFeedback("Incorrect, please try again");
    }
  };

  const handleSubmit = async () => {
    resetFeedback();
    setIsSubmitting(true);
    try {
      const { data } = await sendGuess({
        id: gameId,
        guess: guess.trim().toLowerCase(),
      });
      setIsSubmitting(false);
      displayFeedback({ data });
      setHangman(`Hangman: ${data.hangman}`);
    } catch (err) {
      setIsSubmitting(false);
      displayFeedback({ data: err.response.data, error: true });
    }
  };

  const handleGiveUp = async () => {
    resetFeedback();
    setIsSubmitting(true);
    try {
      const { data } = await sendGiveUp({ id: gameId });
      setIsSubmitting(false);
      displayFeedback({ data, giveUp: true });
    } catch (err) {
      setIsSubmitting(false);
      displayFeedback({ data: err.response.data, error: true });
    }
  };

  return (
    <div className="pt-12 min-h-screen">
      <div className="container mx-auto">
        <Head>
          <title>GuessReddit</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />

        <div className="flex flex-col sm:flex-row justify-center mb-4 gap-4">
          <button
            className="bg-green-400 dark:bg-transparent border border-green-500 text-white p-3 rounded"
            onClick={startNewGame}
          >
            {isLoading ? "Loading..." : "New Game"}
          </button>

          <div className="flex">
            <input
              type="text"
              name="guess"
              id="guess"
              placeholder="Enter your guess here"
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSubmit();
                }
              }}
              className="p-3 dark:bg-transparent flex-grow dark:text-white border-2 outline-none border-r-0 rounded-l border-gray-400 focus:border-gray-400"
            />
            <input
              type="submit"
              value="Submit"
              onClick={handleSubmit}
              disabled={isSubmitting || !gameId || !guess}
              className="p-3 bg-blue-500 disabled:opacity-50 rounded-r text-white border-2 border-gray-400 border-l-0"
            />
          </div>
          <input
            type="submit"
            value="Reveal Answer"
            onClick={handleGiveUp}
            disabled={isSubmitting || !gameId}
            className="p-3 bg-red-500 dark:bg-transparent border border-red-500 disabled:opacity-50 rounded text-white"
          />
        </div>

        <div className="text-center text-gray-700 dark:text-gray-300">
          {hintText}
        </div>

        <div className="text-center text-gray-700 dark:text-gray-300">
          {hangman}
        </div>

        <div
          className={`${feedbackStyle} text-center mt-2 mb-4 p-4 max-w-max mx-auto border-1 rounded`}
          dangerouslySetInnerHTML={{
            __html: feedback,
          }}
        ></div>

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

        <Footer />
      </div>
    </div>
  );
}
