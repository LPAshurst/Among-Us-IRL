import jwt from 'jsonwebtoken';
import { connection } from '../config/db';
import { QueryError, PoolConnection, format } from 'mysql2';
import { User } from '../model/user';

function generateAccessToken(id) {
  return jwt.sign(id, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function createNewUser(req, res) {
  const token = generateAccessToken({ id: req.body.user });
  connection.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.query(format("INSERT INTO user (username, password) VALUES (?, ?)", ) , (err, resultSet: User[]) => {
      conn.release();
      if (err) {
        console.error(err.message);
        res.status(500).send({
          message: 'INTERNAL SERVER ERROR',
          result: null
        });
      } else {
        
        res.json(token);
        res.status(200).send({
          message: 'OK',
          result: resultSet
        });
      }
    })
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

export default { generateAccessToken, createNewUser, authenticateToken };