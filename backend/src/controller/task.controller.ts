import { Request, Response } from 'express';
import { Task } from '../model/task';
import { connection } from '../config/db';
import { QueryError, PoolConnection, format } from 'mysql2';


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

const getExample = (req: Request, res: Response) => {
  connection.getConnection((err: QueryError, conn: PoolConnection) => {

    conn.query("select tasklist.name as listname, tasklist.*, task.* from tasklist LEFT JOIN task ON tasklist.id = task.list_id WHERE tasklist.id = 1", (err, resultSet: any) => {
      conn.release();
      if (err) {
        console.error(err.message);
        res.status(500).send({
          message: 'INTERNAL SERVER ERROR',
          result: null
        });
      } else {
        let newres = {}
        newres['id'] = 1
        newres['name'] = resultSet[0].listname
        let unwrap = ({id, name, location, difficulty, description}) => ({id, name, location, difficulty, description});
        newres['entries'] = resultSet.map(unwrap);
        res.status(200).send({
          message: 'OK',
          result: newres
        });
      }
    })
  });
}

const getUserTasks = (req: Request, res: Response, id: Number) => {
  connection.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.query(format("SELECT * FROM task WHERE user_id = ?", [id]), (err, resultSet: Task[]) => {
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


export default { getAll, getUserTasks, getExample }