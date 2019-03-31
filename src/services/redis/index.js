import { createClient } from 'redis';
import { decorate } from 'async-redis';

const client = createClient();
export const asyncRedisClient = decorate(client);
