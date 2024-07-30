import jwt from 'jsonwebtoken';

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function createNewUser(req, res) {
  const token = generateAccessToken({ username: req.body.username });
  res.json(token);
  // TODO - db creation stuff
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