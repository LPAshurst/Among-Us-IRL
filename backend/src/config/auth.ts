const jwt = require("jsonwebtoken");
import { connection } from '../config/db';
import { QueryError, PoolConnection, format } from 'mysql2';
import { User } from '../model/user';
import { checkServerIdentity } from 'tls';

function generateAccessToken(id) {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function checkUserExists(username, callback) {
  connection.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.query(format("SELECT EXISTS(SELECT * FROM user WHERE username = ?) as exist", [username]), (err, resultSet: any) => {
      conn.release();
      callback(err, Boolean(resultSet[0].exist));
    })
  });
}

function createNewUser(req, res) {
  checkUserExists(req.body.username, (err, exists) => {
    if (err || exists) {
      console.error("Attempted to create user with duplicate username");
      res.status(500).send({
        message: 'USERNAME ALREADY EXISTS',
        result: null
      });
    } else {
      connection.getConnection((err: QueryError, conn: PoolConnection) => {
        conn.query(format("INSERT INTO user (username, password) VALUES (?, ?)", [req.body.username, req.body.password]), (err, resultSet) => {
          if (err) {
            console.error(err.message);
            res.status(500).send({
              message: 'INTERNAL SERVER ERROR',
              result: null
            });
          } else {
            conn.query("SELECT LAST_INSERT_ID()", (err, resultSet: any) => {
              conn.release();
              if (err) {
                console.error(err.message);
                res.status(500).send({
                  message: 'INTERNAL SERVER ERROR',
                  result: null
                });
              } else {
                const token = generateAccessToken(resultSet.LAST_INSERT_ID);
                res.json(token);
              }
            })
          }
        })
      });
    }
  });
}

function getUserToken(req, res) {
  connection.getConnection((err: QueryError, conn: PoolConnection) => {
    conn.query(format("SELECT DISTINCT id FROM user WHERE username = ? AND password = ?", [req.body.username, req.body.password]), (err, resultSet: any) => {
      conn.release();
      if (err) {
        console.error(err.message);
        res.status(500).send({
          message: 'INTERNAL SERVER ERROR',
          result: null
        });
      } else {
        const token = generateAccessToken(resultSet.id);
        res.json(token);
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

export default { generateAccessToken, createNewUser, authenticateToken, getUserToken };