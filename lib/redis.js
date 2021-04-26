import Redis from "ioredis";

let redis = new Redis(process.env.REDIS_URL);

const connectRedis = () => {
  if (
    redis.status == "ready" ||
    redis.status == "connect" ||
    redis.status == "reconnecting"
  )
    return redis;

  redis = new Redis(process.env.REDIS_URL);
  return redis;
};

const disconnectRedis = () => {
  redis.disconnect();
};

export { connectRedis, disconnectRedis };
