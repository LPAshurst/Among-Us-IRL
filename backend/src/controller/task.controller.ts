import { Request, Response } from 'express';
import { Task } from '../model/task';
import { connection } from '../config/db';
import { QueryError, PoolConnection } from 'mysql2';
const getAll = (req: Request, res: Response) => {
    connection.getConnection((err: QueryError, conn: PoolConnection) => {
        conn.query("select * from task", (err, resultSet: Task[]) => {
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
export default { getAll }