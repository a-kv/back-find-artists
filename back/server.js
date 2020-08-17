import express from 'express';
import config from "./config";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import bodyParser from 'body-parser'

dotenv.config();

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    })
    // if i put listen from 27str in .then server working? but i can't send req
    .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json())
app.use("/user", userRoute);
app.use("/", userRoute ); //all users

app.listen(8080, () => {
    console.log("it's ok on localhost:8080 ")
})
