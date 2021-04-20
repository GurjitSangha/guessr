import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

const disconnect = () => {
  redis.disconnect();
};

export default redis;
export { disconnect };
