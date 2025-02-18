import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined in environment variables");
}

// Creating an instance of the Redis client
const redis = new Redis(process.env.REDIS_URL);

redis.on('connect', () => console.log('Connected to Redis'));
redis.on('error', (err) => console.error('Redis Client Error:', err));

async function testRedisConnection() {
  try {
    await redis.set('foo', 'bar');
    const value = await redis.get('foo');
    console.log('Value from Redis:', value);
  } catch (error) {
    console.error('Error testing Redis connection:', error);
  }
}

testRedisConnection();

export default redis;
