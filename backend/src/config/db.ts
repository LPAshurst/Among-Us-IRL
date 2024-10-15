import { createPool as createPoolProm } from 'mysql2/promise';
import { createPool } from 'mysql2';
export const connection = createPool({
  // prefer to use .env for environment variables to hide passwords
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'rootpass',
  database: 'amongus'
});
export const connectionProm = createPoolProm({
  // prefer to use .env for environment variables to hide passwords
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'rootpass',
  database: 'amongus'
});