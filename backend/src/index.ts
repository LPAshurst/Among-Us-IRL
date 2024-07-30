// import needed libraries
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import * as cors from 'cors';
import { config } from 'dotenv';

config();

// get express application
const app = express();
// body parser middleware

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// define app port
const port = process.env.PORT || 3010;
// starts the server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})

app.use('/api', routes);