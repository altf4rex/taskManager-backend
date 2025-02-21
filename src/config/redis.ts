import dotenv from 'dotenv';
dotenv.config();

import Redis from 'ioredis';

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined in environment variables");
}

const redis = new Redis(process.env.REDIS_URL);

redis.on('connect', () => console.log('Connected to Redis'));
redis.on('error', (err) => console.error('Redis Client Error:', err));

export default redis;
