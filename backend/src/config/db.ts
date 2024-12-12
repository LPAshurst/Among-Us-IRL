import { createPool as createPoolProm } from 'mysql2/promise';
import { createPool } from 'mysql2';

const connection = createPool({
  // TODO prefer to use .env for environment variables to hide passwords
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'rootpass',
  database: 'amongus'
});

const connectionProm = createPoolProm({
  // TODO prefer to use .env for environment variables to hide passwords
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'rootpass',
  database: 'amongus'
});

export {connection, connectionProm}