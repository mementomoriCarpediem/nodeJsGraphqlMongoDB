require('dotenv').config();

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';

import schema from './graphql/schema/index';

const app = express();
const port = process.env.PORT;

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.40jgkye.mongodb.net/?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect(uri);

app.use(`/graphql`, graphqlHTTP({ schema, graphiql: true }));

app.listen(port, () => {
  console.log(`서버 실행! 포트번호: ${port}`);
});
