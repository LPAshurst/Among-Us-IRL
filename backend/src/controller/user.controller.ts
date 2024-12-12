import { Request, Response } from 'express';
import { connection } from '../config/db';
import { QueryError, PoolConnection, format } from 'mysql2';
import User from '../model/user';

const getUsers = (req: Request, res: Response) => {
  connection.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.query(format("SELECT * FROM user"), (err, resultSet: User[]) => {
      conn.release();
      if (err) {
        console.error(err.message);
        res.status(500).send({
          message: 'INTERNAL SERVER ERROR',
          result: null
        });
      } else {
        res.status(200).send({
          message: 'OK',
          result: resultSet
        });
      }
    })
  });
}

export default { getUsers }