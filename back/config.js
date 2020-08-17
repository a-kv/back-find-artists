const USER_NAME = 'a-kv';
const PASSWORD = 'r2d2r2d2';
const MONGO_DB = 'db_artists'



export default {
    MONGODB_URL: `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.n5mxo.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`,
    JWT_SECRET:'sthsecret'
}


