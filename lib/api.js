import axios from "axios";

export const startGame = () =>
  axios.get("/api/random", { Accept: "application/json" });

export const sendGuess = (body) =>
  axios.post("/api/guess", body, {
    "Content-Type": "application/json",
    Accept: "application/json",
  });

export const sendGiveUp = (body) =>
  axios.post("/api/giveup", body, { Accept: "application/json" });
